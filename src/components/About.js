import React from 'react'
import '../css/About.css'

export default (props) => {
	const siteConfig = require(`../../data/${props.site}/siteConfig`)
	const markdownData = require(`../../data/${props.site}/bio.md`)
	const imagePath = require(`../images/${siteConfig.aboutImage}`)

	return (
		<div className="profile">
			<img src={imagePath} alt="" />
			{/* <h1>{ this.props.data.heading }</h1> */}
			{/* <h1>{ this.props.data.heading }</h1> */}
			{/* <h1>{ props.data.heading }</h1> */}
			{/* <div className="content">{ props.data.bio }</div> */}
			<div className="content">{ markdownData.title }</div>
			<div className="content">{ markdownData.author }</div>
			<div className="content" dangerouslySetInnerHTML={{ __html: markdownData.__content }} />
		</div>
	)
}
