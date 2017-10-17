/*
 * @Author: saohui 
 * @Date: 2017-10-17 14:36:17 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-10-17 14:48:47
 */
import { BlockLoading } from '../component/loading'
import Alert from '../component/alert'

export default class LoadingOb {
  constructor ( txt, isShowError ) {
    this.txt = txt || '加载中...'
    this.isShowError = isShowError == undefined ? true : isShowError
  }

  onStart () {
    BlockLoading.show( this.txt )
  }
  onComplete ( res ) {
    BlockLoading.hide()
  }
  onError ( err ) {
    if ( this.isShowError ) {
      Alert.show( err.msg || '请求错误', 10000 )
    }
  }
}