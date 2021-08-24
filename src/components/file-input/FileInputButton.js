import React from 'react';
import SheetJSFT from './SheetJSFT';
import './FileInputButton.css';

class FileInputButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		const files = e.target.files;
		if (files && files[0]) {
			this.props.handleFile(files[0]);
		}
	}
	render() {
		return (
			<form className="FileInputButton">
				<label htmlFor="file">Select File</label>
				<input
					type="file"
					id="file"
					accept={SheetJSFT}
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default FileInputButton;