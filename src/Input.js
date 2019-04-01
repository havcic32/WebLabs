import React from 'react';

class Input extends React.Component {
	constructor(props) {
		super(props);
	}
	
	onChange() {
		var value = this.input.value;
		this.props.onChange(value);
	}
	
	setText(text) {
		this.input.value = text;
	}

	render() {
		return (
			<div>
				<input ref={(ref) => this.input = ref} type="text" onChange={this.onChange.bind(this)}/>
			</div>
		);
	}
}

export default Input;