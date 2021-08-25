import { ICalendar } from "datebook";
import { Promise, reject } from "q"
import React, {useState} from "react"
import XLSX from "xlsx"
import moment from 'moment'
const BLANK_ROWS = 3;

function converter(file) {
	
	const load = (file) => {
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = e => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
			/* Get the first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			console.log(rABS, wb);
			/* Convert to row object array */
			/* Run converter */
			convert(ws);
		}
		if (rABS) reader.readAsBinaryString(file);
		else reader.readAsArrayBuffer(file);
	}

	const convert = (sheet) => {
		sheet["!ref"] = 'L16'
		var calendar = null;
		
		var range = XLSX.utils.decode_range('A1:K50');
		console.log(sheet);
		console.log(range);
		for (var rowNum = BLANK_ROWS+1 + range.s.r; rowNum < range.e.r; rowNum++) {
			// check if next class row exists
			if (sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})] != null) {
				// read necessary cells
				let termCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})]['v'];
				let nameCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 1})]['v'];
				let formatCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 5})]['v'];
				let locationTimeAndDayCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 6})]['v'];
				//let professorCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 8})]['v'];
				if (termCell != null) {
					// example: ...2021 Fall B Term -> B 
					let term = termCell[termCell.indexOf("Term") - 2];
					let termDates = initialOptions.dates[term];
					// split all info in "Meeting Patterns" cell
					let splitMPatterns = locationTimeAndDayCell.split(" | ");
					let weekdays = splitMPatterns[0].split("-");
					// convert day abbreviations to those recognized by Datebook
					for (var day = 0; day < weekdays.length; day++) {
						weekdays[day] = weekdayNames[weekdays[day]];
					}

					// read times from Meeting Patterns
					let times = splitMPatterns[1].split(" - ");
					
					let startTimestamp = moment(termDates[0] + " " + times[0], "YYYY-MM-DD h:m A");
					let endTimestamp = moment(termDates[0] + " " + times[1], "YYYY-MM-DD h:m A");
					let finishTimestamp = moment(termDates[1] + " " + times[1], "YYYY-MM-DD h:m A");
					
					let options = {
						title: nameCell,
						location: splitMPatterns[2],
						description: formatCell,
						start: new Date(startTimestamp.format()),
						end: new Date(endTimestamp.format()),
						recurrence: {
							frequency: 'WEEKLY',
							weekdays: weekdays,
							end: new Date(finishTimestamp.format()),
						}
					}

					if (calendar == null)
						calendar = new ICalendar(options);
					else
						calendar.addEvent(new ICalendar(options));
					
				}
			}	
		}
		console.log(calendar.download("testCalendar.ics"));

	}

	load(file);

}

/* generate an array of column objects */
const make_cols = refstr => {
	let o = [],
	C = XLSX.utils.decode_range(refstr).e.c + 1;
	for (var i = 0; i < C; ++i) 
		o[i] = { name: XLSX.utils.encode_col(i), key: i };

	return o;
};

const initialOptions = {
	dates: 
	{
		'A': ["2021-08-25","2021-10-13"],
		'B': ["2021-10-20","2021-12-10"],
		'C': ["2022-01-25","2022-03-04"],
		'D': ["2022-03-14","2022-05-03"],
	},
	specialSchedules:
	{
		'2021-8-25': 'MO',
		'2021-1-12': 'MO',
		'2021-5-3': 'FR' // not going to deal with this one at the moment.
	}
	// add the weird days to switch
}

const weekdayNames = {
	'M': 'MO',
	'T': 'TU',
	'W': 'WE',
	'R': 'TH',
	'F': 'FR'
}
export default converter;