import { useState } from 'react';
import Converter from './util/Converter';
import FileInputDragDrop from './components/FileInputDragDrop'
import FileInputButton from './components/FileInputButton'
import Step from './util/Step'
import './App.css';

function App() {
	const [step, setStep] = useState(Step.SELECTING);
	const uploadFile = (file) => {
		convertFile(file);
	};
	const convertFile = async (file) => {
		Converter.load(file, setStep);
	}

	return (
		<div className="App">
			<FileInputDragDrop handleFile={(file) => uploadFile(file)}>
				<p>Drop to Upload</p>
			</FileInputDragDrop>
			<header className="App-header">
				<h1>Workday Schedule Exporter</h1>
				<p>Upload an .XLSX or .CSV spreadsheet and convert it to an .ICS</p>
			</header>

			<FileInputButton handleFile={(file) => uploadFile(file)}>
				Select File
			</FileInputButton>

			<p>{step}</p>
		</div>
	);
}

export default App;
