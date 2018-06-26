import React from 'react'

export default class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div className="profile">
				<img src={require('../images/400.jpg')} alt="" />
				<h1>{this.props.data.heading}</h1>
				<div className="content">{this.props.data.bio}</div>
			</div>
		)
	}
}
