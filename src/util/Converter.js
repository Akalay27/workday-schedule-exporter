import { ICalendar } from "datebook";
import XLSX from "xlsx"
import moment from 'moment'
import Step from "./Step";

const BLANK_ROWS = 3;
const InitialOptions = {
	DATES: 
	{
		'A': ["2021-08-25","2021-10-13"],
		'B': ["2021-10-20","2021-12-10"],
		'C': ["2022-01-25","2022-03-04"],
		'D': ["2022-03-14","2022-05-03"],
	},
	SPECIAL_SCHEDULES:
	{
		'2021-8-25': 'MO',
		'2021-1-12': 'MO',
		'2021-5-3': 'FR' // Not going to deal with this one at the moment.
	}
	// Add the weird days to switch
}
const WEEKDAY_NAMES = {
	'M': 'MO',
	'T': 'TU',
	'W': 'WE',
	'R': 'TH',
	'F': 'FR'
}

// function Converter(file) {
class Converter {
	static load(file, setStep) {
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = e => {
			// Parse data
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
			// Get the first worksheet
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			// Run converter
			 this.convert(ws, setStep);
		}
		if (rABS) {
			reader.readAsBinaryString(file);
		}
		else {
			reader.readAsArrayBuffer(file);
		}
	}

	static convert(sheet, setStep) {
		sheet["!ref"] = 'L16'
		var calendar = null;
		
		var range = XLSX.utils.decode_range('A1:K50');
		for (var rowNum = BLANK_ROWS + 1 + range.s.r; rowNum < range.e.r; rowNum++) {
			// Check if next class row exists
			if (sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})] != null) {
				// Read necessary cells
				let termCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})]['v'];
				let nameCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 1})]['v'];
				let formatCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 5})]['v'];
				let locationTimeAndDayCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 6})]['v'];
				// Let professorCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 8})]['v'];
				if (termCell != null) {
					// Example: ...2021 Fall B Term -> B 
					let term = termCell[termCell.indexOf("Term") - 2];
					let termDates = InitialOptions.DATES[term];
					// Split all info in "Meeting Patterns" cell
					let splitMPatterns = locationTimeAndDayCell.split(" | ");
					let weekdays = splitMPatterns[0].split("-");
					// Convert day abbreviations to those recognized by Datebook
					for (var day = 0; day < weekdays.length; day++) {
						weekdays[day] = WEEKDAY_NAMES[weekdays[day]];
					}

					// Read times from Meeting Patterns
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

					if (calendar == null) {
						calendar = new ICalendar(options);
					}
					else {
						calendar.addEvent(new ICalendar(options));
					}
				}
			}	
		}

		if (calendar) {
			calendar.download("Workday Schedule.ics");
			setStep(Step.SUCCESS);
		}
		else {
			setStep(Step.ERROR);
		}
	}
}

export default Converter;