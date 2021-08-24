import FileInputDragDrop from './components/file-input/FileInputDragDrop'
import FileInputButton from './components/file-input/FileInputButton'
import './App.css';

function App() {
	return (
		<div className="App">
			<FileInputDragDrop handleFile={(file) => {console.log(file)}}>
				<p>Drop to Upload</p>
			</FileInputDragDrop>
			<header className="App-header">
				<h1>Workday Schedule Exporter</h1>
				<p>Upload an .XLSX or .CSV spreadsheet and convert it to an .ICS</p>
			</header>
			<FileInputButton handleFile={(file) => {console.log(file)}}/>
		</div>
	);
}

export default App;
