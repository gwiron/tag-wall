
import React from 'react'
import {render} from 'react-dom'
import DataCenter from '../module/DataCenter'

export default class App extends React.Component{
	constructor(props){
		super(props)

		DataCenter.getAppIndexNew(60).subscribe((data)=>{
			console.log(data)
		}).start();

	}
	render(){
		return <div> Hello main.js </div>;
	}
}
