
import React from 'react'
import DataCenter from '../module/DataCenter'
import TagWall from '../component/tagWall'

export default class App extends React.Component{
	constructor(props){
		super(props)
	}
  async componentDidMount () {
		let tag = new TagWall( this.refs['tag-wall'] )

		await tag.initLogo('//front-images.oss-cn-hangzhou.aliyuncs.com/i4/90e5757435f5c21c4cfc9d3483b7132a-174-174.png')

		tag.addTag('灵魂出窍的神技')
		tag.addTag('各种神逻辑')
		tag.addTag('很会忽悠人')
		tag.addTag('超积极')
		tag.addTag('玻璃心')
		tag.addTag('热爱学习')
		tag.addTag('射手宝宝')
		tag.addTag('适合创作类工作')
		tag.addTag('更喜欢妈妈')
		tag.addTag('易烊千玺就是射手座')
		tag.addTag('乐观主义者')

		tag.render()
	}

	render(){
		return <canvas ref='tag-wall'></canvas>
	}
}
