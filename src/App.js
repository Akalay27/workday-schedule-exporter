import FileInputDragDrop from './components/file-input/FileInputDragDrop'
import FileInputButton from './components/file-input/FileInputButton'
import './App.css';
import { useState } from 'react';

function App() {
	const Step = {
		SELECTING: "Select File",
		PROCESSING: "Processing",
		DOWNLOADING: "Downloading"
	};
	const [step, setStep] = useState(Step.SELECTING);
	const beginProcessing = (file) => {
		console.log(file);
		setStep(Step.PROCESSING);
	};
	return (
		<div className="App">
			<FileInputDragDrop handleFile={(file) => {beginProcessing(file)}}>
				<p>Drop to Upload</p>
			</FileInputDragDrop>
			<header className="App-header">
				<h1>Workday Schedule Exporter</h1>
				<p>Upload an .XLSX or .CSV spreadsheet and convert it to an .ICS</p>
			</header>
			<FileInputButton step={step} handleFile={(file) => {beginProcessing(file)}} />
		</div>
	);
}

export default App;
