import React from 'react';

class Hyperlink extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<a onClick={() => this.props.click()}>{this.props.text}</a>
			</div>
		);
	}
}

export default Hyperlink;