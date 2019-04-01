import React from 'react';

import Auth from './Auth';
import Reg from './Reg';

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			auth: true
		};
		
		this.child = React.createRef();
	}
	
	reg() {
		this.setState({
			auth: false
		});
	}
	
	auth() {
		this.setState({
			auth: true
		});
	}
	
	changeData(login, pass) {	
		this.child.current.changeData(login, pass);
	}
	
	render() {
		return (
			<div>
				<Auth ref={this.child} non={!this.state.auth} reg={this.reg.bind(this)} login={this.state.login} pass={this.state.pass}/>
				<Reg non={this.state.auth} auth={this.auth.bind(this)} changeData={this.changeData.bind(this)}/>
			</div>
		);
	}
}

export default App;