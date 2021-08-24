import { ICalendar } from "datebook";
import { Promise, reject } from "q"
import React, {useState} from "react"
import XLSX from "xlsx"

const BLANK_ROWS = 3;

function Converter() {
	const [options, setOptions] = useState(initialOptions);
	const [sheet, setSheet] = useState()

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
			const data = XLSX.utils.sheet_to_row_object_array(ws);
			/* Update state */
			this.setSheet(data);
			/* Run converter */
			this.convert();
		}
		if (rABS) reader.readAsBinaryString(file);
		else reader.readAsArrayBuffer(file);
	}

	const convert = () => {
		const row_object = this.sheet;
		const icalendar = new ICalendar();
 
		for (var r = BLANK_ROWS+1; r < row_object.length; r++) {
			let row = row_object[r];
			// example: ...2021 Fall B Term -> B 
			let term = row[0][row[0].indexOf("Term") - 2];
			let termDates = options.dates[term];
			

		}

	}
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
		'A': ["2021-9-25","2021-10-13"],
		'B': ["2021-10-20","2021-12-10"],
		'C': ["2022-1-25","2022-3-4"],
		'D': ["2022-3-14","2022-5-3"],
	},
	// add the weird days to switch
}

const weekdayNames = {
	'M': 'MO',
	'T': 'TU',
	'W': 'WE',
	'R': 'TH',
	'F': 'FR'
}
export default Converter;