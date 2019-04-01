import React from 'react';

import Label from './Label';
import Form from './Form';
import Button from './Button';
import Hyperlink from './Hyperlink';

class Auth extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			login: this.props.login,
			pass: this.props.pass
		};
		
		this.log = React.createRef();
		this.pass = React.createRef();
	}
	
	changeData(login, pass) {
		this.setState({
			login: login,
			pass: pass
		});
		
		this.log.current.setText(login);
		this.pass.current.setText(pass);
	}
	
	changeLogin(value) {
		this.setState({
			login: value
		});
	}
	
	changePassword(value) {
		this.setState({
			pass: value
		});
	}
	
	auth() {
		alert("Hello, " + this.state.login + ".");
	}
	
	render() {
		return (
			<div className={"block" + (this.props.non ? " nonvis" : "")}>
				<Label text="Авторизация"/>
				<Form ref={this.log} text="Логин: " onChange={this.changeLogin.bind(this)}/>
				<Form ref={this.pass} text="Пароль: " onChange={this.changePassword.bind(this)}/>
				<Button text="Авторизация" click={this.auth.bind(this)}/>
				<Hyperlink text="Регистрация" click={this.props.reg}/>
			</div>
		);
	}
}

export default Auth;