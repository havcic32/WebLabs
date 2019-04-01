import React from 'react';

class Label extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<h1>
					{this.props.text}
				</h1>
			</div>
		);
	}
}

export default Label;