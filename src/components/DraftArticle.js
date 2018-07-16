import React from 'react'
import NotFound from './NotFound';
import '../css/Article.css'

export default (props) => {
	const siteConfig = require(`../../data/${props.site}/siteConfig`)
	const imagePath = require(`../images/${siteConfig.aboutImage}`)
	// import(`../css/${props.site}/theme.css`)		// for HMR is needed to use require() instead of import()
	require(`../css/${props.site}/theme.css`)

	try {
		const markdownData = require(`../../data/${props.site}/${props.match.params.slug}.md`)
		const posterStyle = {
			backgroundImage: `url(${markdownData.posterImage})`
		}

		return (
			<div className="article">
				<div className="poster" style={posterStyle}>
					<h1>Article: {markdownData.title}</h1>
					<img src={imagePath} alt="" />
					<div className="content">{ markdownData.title }</div>
					<div className="content">{ markdownData.author }</div>
					<div className="content" dangerouslySetInnerHTML={{ __html: markdownData.__content }} />
				</div>
			</div>
		)
	} catch (err) {
		return NotFound
	}
}
