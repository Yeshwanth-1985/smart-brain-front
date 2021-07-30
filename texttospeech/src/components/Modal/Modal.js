import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalroot = document.getElementById('modal-root');

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el=document.createElement('div');
	}

	componentDidMount() {
		modalroot.appendChild(this.el);
	}

	componentWillUnmount() {
		modalroot.removeChild(this.el);
	}

	render() {
		return ReactDOM.createPortal(this.props.children, this.el);
	}
}

export default Modal;