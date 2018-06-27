import React from 'react'
import markdownData from '../../data/post.md';

export default class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div className="profile">
				<img src={require('../images/400.jpg')} alt="" />
				{/* <h1>{this.props.data.heading}</h1> */}
				{/* <div className="content">{this.props.data.bio}</div> */}
				<div className="content">{markdownData.title}</div>
				<div className="content">{markdownData.author}</div>
				<div className="content" dangerouslySetInnerHTML={{ __html: markdownData.__content }} />
			</div>
		)
	}
}
