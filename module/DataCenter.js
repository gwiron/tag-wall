
import JSONP from '../lib/JSONP';
import PromiseAsync from 'promise-to-async-events'

var API_DOMAIN = "https://route.uat.yuantutech.com";

function getAPIUri( path ){
  return API_DOMAIN.indexOf("http") == 0 ? API_DOMAIN+path : PROTOCOL+API_DOMAIN+path;
}

function ajax(url, data){
    url = getAPIUri(url);
    data = data || {};
    return new Promise((reslove, reject) => {
      var param = {};

      for (var key in data) {
        if (data[key] !== "" && data[key] !== "undefined" && data[key] !== undefined && data[key] !== null) {
          param[key] = data[key]
        }
      }

      JSONP(url, param, reslove, () => {
        reject({msg: "请求错误"})
      });

    });
}


export default {
    getAppIndexNew(unionId) {//获取首页信息
        let obj = {
            unionId : unionId,
            invokerChannel : "H5",
            invokerDeviceType : "others",
            invokerAppVersion : "1.9.23",
        }
        return new PromiseAsync( ajax("/user-web/restapi/common/platform/appIndexNew", obj ) );
    }
};
