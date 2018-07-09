import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes';
// import '../nav.css'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<BrowserRouter>
				<Routes data={this.props.data} />
			</BrowserRouter>
		)
	}
}
