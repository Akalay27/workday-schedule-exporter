import React from 'react';
import './FileInputDragDrop.css';

class FileInputDragDrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {counter: 0};
		this.onDragEnter = this.onDragEnter.bind(this)
		this.onDragLeave = this.onDragLeave.bind(this)
		this.onDrop = this.onDrop.bind(this);
	}
	suppress(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	}
	onDragEnter(evt) {
		this.suppress(evt);
		this.setState({
			counter: this.state.counter + 1
		});
	}
	onDragLeave(evt) {
		this.suppress(evt);
		this.setState({
			counter: this.state.counter - 1
		});
	}
	onDrop(evt) {
		this.suppress(evt);
		const files = evt.dataTransfer.files;
		if (files && files[0]) {
			this.setState({
				counter: 0
			});
			this.props.handleFile(files[0]);
		}
	}
	render() {
		return (
			<div
				onDrop={this.onDrop}
				onDragEnter={this.onDragEnter}
				onDragLeave={this.onDragLeave}
				onDragOver={this.suppress}
				className={"FileInputDragDrop" + (this.state.counter === 0 ? "" : " active")}
			>
				{this.props.children}
			</div>
		);
	}
}

export default FileInputDragDrop;