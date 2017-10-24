/*
 * @Author: saohui 
 * @Date: 2017-10-23 11:02:57 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-10-24 18:55:28
 */

import Alert from '../alert'
import './index.less'

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

    this.footerHeight = 140
    this.bgHeight = this.wrapperHerght - this.footerHeight
    this.bgColor = 'rgba( 0,0,0, .5 )'

    this.boxPadding = 30
    this.width = this.wrapperWidth - this.boxPadding * 2
    this.height = this.bgHeight - this.footerHeight - this.boxPadding // 只要上边框
    this.tagPadding = 5


    this.color = '#fff'
    this.fontFamily = 'Arial'
    this.minFontSize = 30
    this.maxFontSize = 60



    this.babyName = ''
    this.logo = null
    this.QRImg = null
    this.tagList = []
  }

  async initLogo ( logoImg ) {
    let width = this.width * .28

    try {
      let img = await loadImg( logoImg )
      this.logo = {
        img
        ,width
        ,height: width
        ,left: Math.floor(( this.width - width ) / 2 )
        ,top: Math.floor(( this.height + this.footerHeight - this.boxPadding - width ) / 2 )
      }
    } catch (e) {
      if ( e.success === false ) {
        Alert.show( e.msg, 1000 )
      }
    }
  }
  async initQR ( url ) {
    let width = 130

    try {
      let img = await loadImg( url )
      this.QRImg = {
        img
        ,width
        ,height: width
        ,left: Math.floor( this.wrapperWidth + ( this.footerHeight - width ) / 2 - this.footerHeight - 4 )
        ,top: Math.floor( this.wrapperHerght + ( this.footerHeight - width ) / 2 - this.footerHeight )
      }
    } catch (e) {
      if ( e.success === false ) {
        Alert.show( e.msg, 1000 )
      }
    }
  }

  initBabyName ( name = '' ) {
    this.babyName = name +' 宝宝'
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
  
    let fontSize = Math.floor( random( .9 ) * ( this.maxFontSize - this.minFontSize ) / 2 + this.minFontSize )
    
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
    // console.log( this.logo, obj )
    return ret ||
      andArea({ // 图片边框
        left: this.logo.left - this.tagPadding
        , top: this.logo.top - this.tagPadding
        , height: this.logo.height + this.tagPadding * 2
        , width: this.logo.width + this.tagPadding * 2
      }, left2, top2, right2, bottom2 )

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

    let fontSize = Math.floor(( this.wrapperWidth - 200 ) / 15 )
    let left = this.boxPadding
    , top = ( this.bgHeight + ( this.footerHeight - fontSize ) / 2 ) + fontSize - 4

    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.fillRect( 0, this.bgHeight, this.wrapperWidth, this.footerHeight )
    ctx.font = fontSize +'px '+ this.fontFamily
    ctx.fillStyle = '#000'
    ctx.textAlign = 'left'
    ctx.fillText( '快来定制你的宝宝专属AI标签吧', left, top )

    ctx.beginPath()
    let QRImg = this.QRImg
    ctx.drawImage( QRImg.img, QRImg.left, QRImg.top, QRImg.width, QRImg.height )
  }
  renderName ( ctx ) {

    let fontSize = 48
    let left = this.width / 2 + this.boxPadding
    , top = ( this.bgHeight - this.footerHeight ) + fontSize + ( this.footerHeight - fontSize ) / 2

    ctx.beginPath()
    ctx.font = fontSize +'px '+ this.fontFamily
    ctx.fillStyle = '#34f8ff'
    ctx.textAlign = 'center'
    ctx.fillText( this.babyName, left, top )

    // 左括号
    left = 68
    top = this.bgHeight - this.footerHeight + ( this.footerHeight - fontSize * 1.5 ) / 2

    ctx.beginPath()
    ctx.fillRect( left, top, 6, fontSize * 1.5 )
    ctx.beginPath()
    ctx.fillRect( left, top, 32, 6 )

    // 右括号
    left = this.wrapperWidth - 68

    ctx.beginPath()
    ctx.fillRect( left, top, 6, fontSize * 1.5 )

    left = left - 26
    top = top + fontSize * 1.5
    ctx.beginPath()
    ctx.fillRect( left, top, 32, 6 )

  }
  renderTags ( ctx ) {
    for( let i = 0 ; i < this.tagList.length ; i++ ) {
      const item = this.tagList[i]

      // console.log( item )
      ctx.beginPath()
      ctx.font = item.fontSize +'px '+ this.fontFamily
      ctx.fillStyle = this.color
      ctx.textAlign = 'left'

      let left = item.left + this.tagPadding + this.boxPadding
      , top = item.top + this.tagPadding + item.height - 4 + this.boxPadding

      ctx.fillText( item.text, left, top )
    }
  }
  renderLogoAndBg ( ctx ) {
    let logo = this.logo

    ctx.beginPath()
    // 背景绘制
    ctx.drawImage( logo.img, (this.wrapperWidth - this.bgHeight) / 2 , 0, this.bgHeight, this.bgHeight )
    ctx.fillStyle = this.bgColor
    ctx.fillRect( 0, 0, this.wrapperWidth, this.bgHeight )

    // logo
    let rx = Math.floor( logo.left + logo.width / 2 ) + this.boxPadding
    , ry = Math.floor( logo.top + logo.height / 2 ) + this.boxPadding
    , r = logo.width / 2
    , left = logo.left + this.boxPadding
    , top = logo.top + this.boxPadding
    ctx.save()
    ctx.arc( rx, ry, r, 0, Math.PI * 2 )
    ctx.clip()
    ctx.drawImage( logo.img, left , top, logo.width, logo.height )
    ctx.restore()
  }
  render ( body ) {
    // console.log( this.tagList, JSON.stringify( this.tagList ) )
    const ctx = this.ctx
    ctx.clearRect( 0,0, this.wrapperWidth, this.wrapperHerght )

    let logo = this.logo
    if ( logo ) {
      this.renderLogoAndBg( ctx )
    }

    this.renderQRCode( ctx )
    
    this.renderTags( ctx )
    
    this.renderName( ctx )
    
    try {
      var beauty = new Image()
      beauty.src = this.tagCanvas.toDataURL()
      body.appendChild( beauty )
    } catch (e) {
      console.error( e )
      // body.innerHTML = ( JSON.stringify( e ))
    }
  }
}

function loadImg ( url ) {
  var beauty = new Image()
  beauty.src = url
  beauty.crossOrigin="Anonymous"
  
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

function random ( center = .5 ) {
  let cheap = Math.random() > .6 ? .1 : 
                Math.random() > .4 ? .2 :
                  Math.random() > .2 ? .3 :
                    Math.random() > .1 ? .4 : .5
  cheap = ( Math.random() > .5 ? -cheap : cheap ) + center
  let ret = (( Math.random() - cheap ) * ( Math.random() - cheap ) + cheap )

  if ( !(ret > 0 && ret < 1) ) {
    ret = random()
  }
  return ret
}