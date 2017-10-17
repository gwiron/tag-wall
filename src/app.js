import React from 'react'
import {render} from 'react-dom'
import "./all.less"

import Alert from '../component/alert'
import { BlockLoading } from '../component/loading'

import Index from './index'
import Test from './test'
import MyEvaluate from './my-evaluate'

class App extends React.Component {
  constructor(props) {
    super(props);
    let pathname = window.location.pathname;
    //截取页面名字 /a/b.html ==> b.html
    let pageName = pathname.match(/(\/[\w\-]+\.(html|php)$)/);//tms中会有php的页面
    pageName = pageName && pageName[1] ? pageName[1] : null;
    this.page = pageName ? pages[pageName] : null;
  }

  render() {
    let Page = this.page;
    /**
     * 阻断性加载中状态  BlockLoading
     * 非阻断性加载中状态  Loading
     * **/
    if (Page) {
      return <div>
        <BlockLoading />
        <Alert />
        <Page />
      </div>
    } else {
      return <div>您访问的页面不存在{window.location.pathname}</div>
    }
  }
}


let pages = {};
function register(pathname, page) {
  if (!pages[pathname]) {
    pages[pathname] = page;
  } else {
    throw new Error(`"${pathname}" Already exist`);
  }
}


register('/index.html', Index);
register('/test.html', Test);

register('/my-evaluate.html', MyEvaluate )

render(<App />, document.getElementById("root"));
