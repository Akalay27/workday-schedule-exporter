import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
/*

interface usage:

1 page centered x/y interface:

drag/upload xlsx file.
press convert on the file
download ics file automatically or with button

options interface:
opens CodeMirror tab with the json settings, including:

those specific dates where the schedule is the same as a different day.
whether to include professor name in the notes or the right location.

this could also be a series of DatePickers and checkboxes as well instead of a CodeMirror editor.

*/
