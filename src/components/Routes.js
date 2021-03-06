import React from 'react';
import { Route, Link } from 'react-router-dom'
import { Switch } from 'react-router'
import universal from 'react-universal-component'
// import About from './About';
// import Gallery from './Gallery';
// import Article from './Article';
import '../nav.css'

const UniversalComponent = universal((props) => import(`./${props.page}`))

export default (props) => (
	<div>
		<div className="nav">
			<Link to="/about">About</Link>
			<Link to="/gallery">Gallery</Link>
			<Link to="/article/bio">Article - bio</Link>
		</div>
		<Switch>
			{/* <Route path="/about" render={() => <About data={props.data} />} /> */}
			{/* <Route exact path="/gallery" component={Gallery} /> */}
			{/* <Route exact path="/article" component={Article} /> */}
			<Route exact path="/gallery">
				<UniversalComponent page="Gallery" />
			</Route>
			<Route path="/article/:slug"
				render={({ staticContext, match }) => {
					const site = staticContext ? staticContext.site : location.hostname.split('.')[0]
					return <UniversalComponent page="Article" data={props.data} site={site} match={match} />
				}}
			/>
			<Route path="/about"
				render={({ staticContext }) => {
					const site = staticContext ? staticContext.site : location.hostname.split('.')[0]
					return <UniversalComponent page="About" data={props.data} site={site} />
				}}
			/>
			<Route>
				<UniversalComponent page="NotFound" />
			</Route>
		</Switch>
	</div>
)
