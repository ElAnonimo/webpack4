import React from 'react'
import markdownData from '../../data/post.md';

export default (props) => {
	return (
		<div className="profile">
			<img src={ require('../images/400.jpg') } alt="" />
			{ /* <h1>{this.props.data.heading}</h1> */ }
			{ /* <h1>{this.props.data.heading}</h1> */ }
			<h1>{ props.data.heading }</h1>
			<div className="content">{ props.data.bio }</div>
			<div className="content">{ markdownData.title }</div>
			<div className="content">{ markdownData.author }</div>
			<div className="content" dangerouslySetInnerHTML={ { __html: markdownData.__content } } />
		</div>
	)
}
