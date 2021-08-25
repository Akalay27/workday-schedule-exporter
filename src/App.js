import FileInputDragDrop from './components/file-input/FileInputDragDrop'
import FileInputButton from './components/file-input/FileInputButton'
import './App.css';
import {useState} from 'react'

import converter from './components/util/Converter';
function App() {
	const [file, setFile] = useState();
	
	return (
		<div className="App">
			<FileInputDragDrop handleFile={(file) => setFile(file)}>
				<p>Drop to Upload</p>
			</FileInputDragDrop>
			<header className="App-header">
				<h1>Workday Schedule Exporter</h1>
				<p>Upload an .XLSX or .CSV spreadsheet and convert it to an .ICS</p>
			</header>
			<FileInputButton handleFile={(file) => setFile(file)}/>
			<button onClick={async () => {
				converter(file)
			}}>Convert</button>
		</div>
	);
}

export default App;
