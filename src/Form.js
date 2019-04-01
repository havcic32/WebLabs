import React from 'react';

import Input from './Input';

class Form extends React.Component {
	constructor(props) {
		super(props);
		
		this.child = React.createRef();
	}
	
	setText(text) {
		this.child.current.setText(text);
	}
	
	render() {
		return (
			<div>
				{this.props.text} <Input ref={this.child} onChange={this.props.onChange}/>
			</div>
		);
	}
}

export default Form;