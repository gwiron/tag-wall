/*
 * @Author: saohui 
 * @Date: 2017-10-23 11:02:57 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-10-24 11:24:16
 */

import Alert from '../alert'

const WINDOW_WIDTH = window.innerWidth
, WINDOW_HEIGHT = window.innerHeight

export default class TagWall {
  constructor ( tagCanvas, width, height ) {
    this.tagCanvas = tagCanvas

    this.wrapperWidth = width || WINDOW_WIDTH
    this.wrapperHerght = height || WINDOW_HEIGHT

    tagCanvas.width = this.wrapperWidth
    tagCanvas.height = this.wrapperHerght

    this.ctx = tagCanvas.getContext('2d')

    this.bgHeight = this.wrapperHerght - 100
    this.bgColor = 'rgba( 0,0,0, .5 )'

    this.width = this.wrapperWidth
    this.height = this.bgHeight - 100

    this.color = '#eee8e8'
    this.fontFamily = 'Arial'



    this.logo = null
    this.tagList = []
    this.tagPadding = 0
  }

  async initLogo ( logoImg ) {
    let width = this.width / 4

    try {
      let img = await loadImg( logoImg )
      this.logo = {
        img
        ,width
        ,height: width
        ,left: Math.ceil(( this.width - width ) / 2 )
        ,top: Math.ceil(( this.height - width ) / 2 )
      }
    } catch (e) {
      if ( e.success === false ) {
        Alert.show( e.msg, 1000 )
      }
    }
  }

  addTag ( text ) {
    const ret = {
      text: text
    }
    
    this.countPosition( ret, text )

    this.tagList.push( ret )
  }
  countPosition ( obj, text ) {
    const ctx = this.ctx
  
    let fontSize = Math.floor( Math.random() * 18 + 20 )
    
    ctx.font = fontSize +'px '+ this.fontFamily
    
    obj.fontSize = fontSize
    obj.width = ctx.measureText( text ).width + this.tagPadding * 2
    obj.height = fontSize + this.tagPadding * 2
    obj.left = Math.floor( random() * ( this.width - obj.width ))
    obj.top = Math.floor( random() * ( this.height - obj.height ))

    if ( this.checkColl( obj )) {
      console.log('碰撞了')
      this.countPosition( obj, text )
    }
    
    return obj
  }
  checkColl ( obj ) {
    let left2 = obj.left
    , top2 = obj.top
    , right2 = obj.left + obj.width
    , bottom2 = obj.top + obj.height
    // console.log( left, right, top, bottom )

    let ret = this.tagList.some(( item ) => {
      return andArea( item, left2, top2, right2, bottom2 )
    })
    // console.log( ret )
    return ret || andArea( this.logo, left2, top2, right2, bottom2 )

    // 相交面积等于 0 的时候说明没有碰撞
    function andArea ( item, left2, top2, right2, bottom2 ) {
      let left1 = item.left
      , top1 = item.top
      , right1 = item.left + item.width
      , bottom1 = item.top + item.height
      
      return left1 < right2
            && right1 > left2
            && top1 < bottom2
            && bottom1 > top2
    }
  }

  renderQRCode ( ctx ) {

    let fontSize = Math.ceil(( this.wrapperWidth - 100 ) / 15 )
    let left = 10
    , top = ( this.bgHeight + ( 100 - fontSize ) / 2 ) + fontSize - 4

    ctx.beginPath()
    ctx.font = fontSize +'px '+ this.fontFamily
    ctx.fillStyle = '#000'
    ctx.textAlign = 'left'
    ctx.fillText( '快来定制你的宝宝专属AI标签吧', left, top )
  }
  renderName () {
    
  }
  renderTags ( ctx ) {
    for( let i = 0 ; i < this.tagList.length ; i++ ) {
      const item = this.tagList[i]

      // console.log( item )
      ctx.beginPath()
      ctx.font = item.fontSize +'px '+ this.fontFamily
      ctx.fillStyle = this.color
      ctx.textAlign = 'left'

      let left = item.left + this.tagPadding
      , top = item.top + this.tagPadding + item.height - 4

      ctx.fillText( item.text, left, top )
    }
  }
  renderLogoAndBg ( ctx ) {
    let logo = this.logo

    // 背景绘制
    ctx.drawImage( logo.img, (this.width - this.bgHeight) / 2 , 0, this.bgHeight, this.bgHeight )
    ctx.fillStyle = this.bgColor
    ctx.fillRect( 0, 0, this.width, this.bgHeight )

    // logo
    ctx.drawImage( logo.img, logo.left , logo.top, logo.width, logo.height )
  }
  render () {
    // console.log( this.tagList, JSON.stringify( this.tagList ) )
    const ctx = this.ctx
    ctx.clearRect( 0,0, this.wrapperWidth, this.wrapperHerght )

    let logo = this.logo
    if ( logo ) {
      this.renderLogoAndBg( ctx )
    }

    this.renderQRCode( ctx )
    
    this.renderTags( ctx )
  }
}

function loadImg ( url ) {
  var beauty = new Image()
  beauty.src = url
  
  return new Promise( function ( resolve, reject ) {
    
    if ( beauty.complete ) {
      resolve( beauty )
    } else {
      beauty.onload = function(){
        resolve( beauty )
      }
      beauty.onerror = function(){
        reject({ success: false, msg: '加载logo失败，请刷新重试'})
      }
   }
  })
}

function random () {
 return ( Math.random())
}