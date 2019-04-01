import React from 'react';

import Label from './Label';
import Form from './Form';
import Button from './Button';
import Hyperlink from './Hyperlink';

class Reg extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			login: '',
			pass: ''
		};
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
	
	reg() {
		this.props.changeData(this.state.login, this.state.pass);
		this.props.auth();
	}
	
	render() {
		return (
			<div className={"block" + (this.props.non ? " nonvis" : "")}>
				<Label text="Регистрация"/>
				<Form text="Логин: " onChange={this.changeLogin.bind(this)}/>
				<Form text="Пароль: " onChange={this.changePassword.bind(this)}/>
				<Form text="Фамилия: " onChange={function(){}}/>
				<Form text="Имя: " onChange={function(){}}/>
				<Form text="Отчество: " onChange={function(){}}/>
				<Button text="Регистрация" click={this.reg.bind(this)}/>
				<Hyperlink text="Авторизация" click={this.props.auth}/>
			</div>
		);
	}
}

export default Reg;