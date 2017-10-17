/*
 * @Author: saohui 
 * @Date: 2017-10-17 11:24:06 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-10-17 14:51:16
 */

import React from 'react'
import util from '../lib/util'
import DataCenter from '../module/DataCenter'
import PullUpRefresh from '../component/PullUpRefresh'
import './my-evaluate.less'
import LoadingOb from '../lib/LoadingOb'

import EvaluateItem from '../component/showEvaluate/EvaluateItem'
import TagList from '../component/showEvaluate/TagList'

export default class ShowEvaluate extends React.Component {
  constructor ( props ) {
    super( props )
    
    const query = util.query()
    this.unionId = query.unionId
    this.corpId = query.corpId

    this.state = {
      ...this.state
      ,loading: true
      ,success: true
      ,totalTag: 0
      ,tagList: []
      ,evaluateList: []
      ,totalEvaluate: 0
    }
  }

  onNextPage ({ pageSize, currentPage, packingLoadCtx }) {
    const { corpId, unionId } = this
    
    DataCenter.getMyEvaluate( corpId, currentPage + 1, pageSize, unionId )
      .subscribe( packingLoadCtx( this ))
      .mock('http://rap.yuantutech.com/mockjsdata/25/restapi/ytDoct/getEvaluate')
      .start()
  }
  
  onComplete ( result, { onFinished }) {
    // console.log( result )
    const { tagData, evaluateData } = result.data
    const { evaluateList } = this.state
    , resultEvaluateList = evaluateList.concat( evaluateData.evaluateList )

    if ( result.success ) {
      this.setState({
        loading: false
        ,success: true
        ,totalTag: tagData.totalTag
        ,tagList: tagData.tagList
        ,evaluateList: resultEvaluateList
        ,totalEvaluate: evaluateData.totalEvaluate
      })
    }
    
    if ( evaluateData.totalEvaluate == resultEvaluateList.length ) {
      onFinished()
    }
  }

  /***** render 区开始 *****/
  
  renderHeader () {
    const { tagList, totalEvaluate } = this.state

    return tagList.length > 0 ? <TagList showMore={ true }>
      { tagList.map(( item, key) => {
        return <div key={ key } disabled={ item.color == 2 }>{ item.name +'('+ item.tagNum +')'}</div>
      })}
    </TagList> : null
  }
  renderBody () {
    const { evaluateList } = this.state

    return <div className="show-evaluate-container">
      { evaluateList.map(( item, key ) => {
          return <EvaluateItem
                key={ key }
                data={{
                  userName: item.patientName.slice( 0, 1 ) + '**'
                  ,point: item.totalEvaluate
                  ,content: item.evaluate
                  ,date: item.updateTime
                  ,append: item.appendEvaluate
                  ,appendDate: item.appendTime
                }}
                isShowAppend={ true }
                isEvalDataLineLt2={ false }/>
        })}
    </div>
  }

  render () {
    return <PullUpRefresh className="show-evaluate"
                          initPageSize={ 20 }
                          onNextPage={( e ) => this.onNextPage( e )}
                          >
      { this.renderHeader()}
      { this.renderBody()}
    </PullUpRefresh>
  }
}