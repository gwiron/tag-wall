/*
 * @Author: saohui 
 * @Date: 2017-10-24 19:24:32 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-10-25 16:40:03
 */
import React from 'react'
import DataCenter from '../module/DataCenter'
import TagWall from '../component/tagWall'
import { BlockLoading } from '../component/loading'
import util from '../lib/util'

import './index.less'

export default class App extends React.Component {
	constructor(props){
		super(props)

		const query = util.query()

		this.name = query.name
		this.birthday = query.birthday
	}
  async componentDidMount () {
		BlockLoading.show('正在生成专属 AI 宝宝...')
		let tag = new TagWall( this.refs['tag-wall'], 750, 890 )

		// await tag.initLogo('https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/ec3eacb6fa6bfae5e95973ee3c712818-144-144.png')
		// await tag.initLogo('http://image.yuantutech.com/user/7b6fa819951ada163d0fff818af7e6fc-84-84.png')
		// await tag.initQR('http://image.yuantutech.com/user/7b6fa819951ada163d0fff818af7e6fc-84-84.png')
		// await tag.initLogo('http://uat.yuantutech.com/yuantu/omp-h5-cli/1.0.1/111.jpg')
		// await tag.initQR('http://uat.yuantutech.com/yuantu/omp-h5-cli/1.0.1/qr.png')
		await tag.initLogo('../build/111.jpg')
		await tag.initQR('../build/qr.png')

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
		return <div className="index">
			<div ref="tag-body" className="tag-body">
				<canvas ref='tag-wall'></canvas>
			</div>
			<div className="induced-sharing">
				<img src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/dd36b724dbee02ec13e08643e972ca7f-1080-368.png" alt=""/>
			</div>
		</div>
	}
}
