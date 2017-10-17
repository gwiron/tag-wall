import url from 'url';

let util = {
  query: function () {
    const urlInfo = url.parse(window.location.href, true).query;
    for(let key in urlInfo) {
      if (urlInfo[key] instanceof Array) {
        urlInfo[key] = urlInfo[key][0]
      }
    }
    return urlInfo;
  },
  dateFormatGMT: function (source, pattern) {
    let time = new Date(source);
    time.setUTCHours(time.getUTCHours() + ((time.getTimezoneOffset() + 8 * 60) / 60));
    return this.dateFormat(time, pattern);
  },
  dateFormat: function (source, pattern) {
    // Jun.com.format(new Date(),"yyyy-MM-dd hh:mm:ss");
    //Jun.com.format(new Date(),"yyyy年MM月dd日 hh时:mm分:ss秒");
    if (!source) {
      return "";
    }

    source = new Date(source);
    var pad = this.pad,
      date = {
        yy: String(source.getFullYear()).slice(-2),
        yyyy: source.getFullYear(),
        M: source.getMonth() + 1,
        MM: pad(source.getMonth() + 1, 2, '0'),
        d: source.getDate(),
        dd: pad(source.getDate(), 2, '0'),
        h: source.getHours(),
        hh: pad(source.getHours(), 2, '0'),
        m: source.getMinutes(),
        mm: pad(source.getMinutes(), 2, '0'),
        s: source.getSeconds(),
        ss: pad(source.getSeconds(), 2, '0')
      };
    return (pattern || "yyyy-MM-dd hh:mm:ss").replace(/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s/g, function (v) {
      return date[v];
    });

  },
  pad: function (string, length, pad) {
    var len = length - String(string).length
    if (len < 0) {
      return string;
    }
    var arr = new Array(length - String(string).length || 0)
    arr.push(string);
    return arr.join(pad || '0');
  }

  // 把多维数组进行铺平
  ,arrDeepFlattenL: function deepFlatten(arr) {
     const flatten = (arr)=> [].concat(...arr); return flatten(arr.map(x=>Array.isArray(x)? deepFlatten(x): x))
  }

  ,translateHtmlToTxt ( html ) {
    const dom = document.createElement('div')
    dom.innerHTML = html
    return dom.textContent
  }
}

export default util;