/*
 * @Author: saohui 
 * @Date: 2017-10-24 19:24:32 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-10-24 19:38:27
 */
import React from 'react'
import DataCenter from '../module/DataCenter'
import TagWall from '../component/tagWall'
import { BlockLoading } from '../component/loading'

export default class App extends React.Component {
	constructor(props){
		super(props)
	}
  async componentDidMount () {
		BlockLoading.show('正在生成专属 AI 宝宝...')
		let tag = new TagWall( this.refs['tag-wall'], 750, 890 )

		// await tag.initLogo('http://image.yuantutech.com/user/7b6fa819951ada163d0fff818af7e6fc-84-84.png')
		// await tag.initQR('http://image.yuantutech.com/user/7b6fa819951ada163d0fff818af7e6fc-84-84.png')
		// await tag.initLogo('../component/tagWall/111.jpg')
		// await tag.initQR('../component/tagWall/qr.png')
		await tag.initLogo('http://uat.yuantutech.com/yuantu/omp-h5-cli/1.0.1/111.jpg')
		await tag.initQR('http://uat.yuantutech.com/yuantu/omp-h5-cli/1.0.1/qr.png')

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

		tag.initBabyName('李小萌')
		tag.render( this.refs['tag-body'])


		BlockLoading.hide()
	}

	render(){
		return <div ref="tag-body" className="tag-body">
			<canvas ref='tag-wall'></canvas>
		</div>
	}
}
