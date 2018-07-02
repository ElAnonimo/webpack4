import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import universal from 'react-universal-component'
import About from './About';
import Gallery from './Gallery';
import Article from './Article';

const UniversalComponent = universal((props) => import(`./${props.page}`))

export default (props) => {
	return (
		<div>
			<div className="nav">
				<Link to="/about">About</Link>
				<Link to="/gallery">Gallery</Link>
				<Link to="/article">Article</Link>
			</div>
			<Switch>
				{/* <Route path="/about" render={() => <About data={props.data} />} /> */}
				{/* <Route exact path="/gallery" component={Gallery} /> */}
				{/* <Route exact path="/article" component={Article} /> */}
				<Route exact path="/gallery">
					<UniversalComponent page="Gallery" />
				</Route>
				<Route exact path="/article">
					<UniversalComponent page="Article" />
				</Route>
				<Route path="/about">
					<UniversalComponent page="About" data={props.data} />
				</Route>
			</Switch>
		</div>
	)
}
