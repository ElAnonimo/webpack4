import React from 'react';
import { Route, Link } from 'react-router-dom'
import About from './About';
import Gallery from './Gallery';
import Article from './Article';

export default (props) => {
	return (
		<div>
			<div className="nav">
				<Link to="/about">About</Link>
				<Link to="/gallery">Gallery</Link>
				<Link to="/article">Article</Link>
			</div>
			<Route path="/about" render={() => <About data={props.data} />} />
			<Route exact path="/gallery" component={Gallery} />
			<Route exact path="/article" component={Article} />
		</div>
	)
}
