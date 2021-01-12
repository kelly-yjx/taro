import Taro from '@tarojs/taro'
import sha1 from 'js-sha1';
function Toast(title: any,duration=1500,mask=true,icon:any='none'){
  Taro.showToast({
    title,
    duration,
    mask,
    icon
  })
}

// 路由跳转
export const goRoute = (path, params) => {
    !params && (params = {});
    for (let k in params) {
        path += `&${k}=${params[k]}`
    }
    Taro.navigateTo({ url: path.replace('&', '?') });
}


export const redirectTo = (path, params) => {
    !params && (params = {});
    for (let k in params) {
        path += `&${k}=${params[k]}`
    }
    Taro.redirectTo({ url: path.replace('&', '?') });
}


// 路由跳转
export const navigateBack = (number) => {
    console.log('回退栈', number)
    Taro.navigateBack({
        delta: number
    })
}


// 金额千分逗号隔开
export const formatNumber = val => {
    const result = [];
    if (!val) return '0';
    val += '';
    while (val.length > 3) {
        result.unshift(val.slice(-3));
        val = val.slice(0, -3);
    }
    if (!!result.length) {
        val += ',' + result.join(',');
    }
    return val;
}
// 金额千分逗号隔开
export const formatNumber2 = val => {
    const result = [];
    if (!val) return '0';
    var newVal = String(val);
    if (val.length < 4) return val;
    val = newVal.split('.')[0];
    var last = '.' + newVal.split('.')[1];
    val += '';
    while (val.length > 3) {
        result.unshift(val.slice(-3));
        val = val.slice(0, -3);
    }
    if (!!result.length) {
        val += ',' + result.join(',');
    }
    return val;
}
// 金额千分逗号隔开 含2位有效数字
export const formatNumber1 = val => {
    const result = [];
    if (!val) return '0';
    var newVal = String(val);
    if (val.length < 4) return val;
    val = newVal.split('.')[0];
    var last = '.' + newVal.split('.')[1];
    val += '';
    while (val.length > 3) {
        result.unshift(val.slice(-3));
        val = val.slice(0, -3);
    }
    if (!!result.length) {
        val += ',' + result.join(',');
    }
    return val + last;
}
// 统一的 Http 请求
export const Http = {
    Handel(url, method, data, fn) {
        if (Object.prototype.toString.call(data) === "[object Function]") {
            fn = data
            data = {}
        }


        if (data.hasOwnProperty('jwtOrToken')) {
            var query = { ...getEncryption(), ...data }
        } else {
            var query = { fyxToken: Taro.getStorageSync('orderData').fyxToken || '', ...getEncryption(), ...data }
        }


        // const u = navigator.userAgent;
        // if (u.indexOf('gtmcapp') > -1) {
        //     var query = { ...getEncryption(), ...data, jwtOrToken: window.getAppUserDetails.jwt, checkType: '1', userId: window.getAppUserDetails.userId, phone: window.getAppUserDetails.tel }
        // }

        Taro.request({
            url,
            method,
            data: query,
            // data,
            mode: 'cors',
            header: {
                'content-type': 'application/json',
                'Cache-Control': 'no-store'
                // 'Authorization': "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzEyMDUwODgzMSIsInVzZXJJZCI6IjU5ODYyIiwibmFtZSI6IuWTiOWTiCIsInJlbWFyayI6IiIsImRlYWxlckNvZGUiOiI0NEExMCIsImRlYWxlck5hbWUiOiLlub_msb3kuLDnlLDnrKzkuIDlupciLCJraWNrT3V0Ijp0cnVlLCJ0ZWxQaG9uZSI6IjEzMTIwNTA4ODMxIiwiZXhwIjoxNTgxMjQyNjk2fQ.xnHhnImrYakgM3t_YNRlJbHVx-b7KqqeVdxeljU7KmPcODe_satypZVCuyxLSu5rG5iPmANtQ0maZwy0Uc7LJ9SwpVnluNMs42ybkOolXT94dPFErjblo5elrcbsGHMWYoUuBLfmVdIJHImjVZaFH4qfF4wGuY2bclhCqohWeIA"
            },
            success: res => {
                fn && fn(res.data)
            },
            fail: () => {

            },
            complete: () => {
                Taro.hideLoading();
            }
        })
    },
    get(url, data, fn) {
        return this.Handel(url, 'GET', data, fn)
    },
    post(url, data, fn) {
        return this.Handel(url, 'POST', data, fn)
    }

}



// 防抖
export const debounce = (fn, time) => {
    let timer:any;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, time)
    }
}
// 节流
export const throtte = (fn, time) => {
    let actTime = 0;
    return () => {
        const current = Date.now();
        if (current - actTime > time) {
            fn.apply(this, arguments);
            actTime = Date.now();
        }
    }
}

// 埋点
export const sensors = ($event, obj) => {
    !!window.sensors && window.sensors.track($event, obj)
}



// 只需 精确到分
function getTimeToMinutes(val) {
    var newDate = new Date(val);
    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate();
    var hour = newDate.getHours();
    var minutes = newDate.getMinutes();
    return new Date(`${year}/${month}/${day} ${hour}:${minutes}:00`).getTime();
}


export const getCountDownTime = (expirationDate) => {
    let str = 0;
    // console.log(expirationDate, 'expirationDate')
    var timer = setInterval(() => {
        if (expirationDate <= new Date().getTime()) {
            clearInterval(timer);
            return str
        } else {
            return getCountDown(expirationDate)
        }
    }, 1000)
}


// 返回时间格式
export const formatDate = date => {
    if (!date) {
        return ''
    }
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    mi = mi < 10 ? '0' + mi : mi;
    s = s < 10 ? '0' + s : s;

    return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s
}

export const formatDate1 = date => {
    if (!date) {
        return ''
    }
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    mi = mi < 10 ? '0' + mi : mi;
    s = s < 10 ? '0' + s : s;

    return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
}

export const formatDateYMDHMS = date => {
    if (!date) {
        return ''
    }
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    mi = mi < 10 ? '0' + mi : mi;
    s = s < 10 ? '0' + s : s;

    return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
}

// 返回时间格式
export const formatDateYMD = date => {
    if (!date) {
        return ''
    }
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    return y + '-' + m + '-' + d;
}

//对字符串进行加密   
export const compileStr = (code) => {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
}


//字符串进行解密   
export const uncompileStr = (code) => {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
}

// HyperWebAnalytics
export const HyperProjectId = () => {
    var id = location.origin.includes('carapptest') ? 8579 : 8585;
    return id
}


// 将百度地图经纬度转换为腾讯/高德地图经纬度
export const bMapTransQQMap = (lng, lat) => {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = lng - 0.0065;
    let y = lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta);
    let lats = z * Math.sin(theta);

    return {
        lon: lngs,
        lat: lats
    }
}


// 将百度地图经纬度转换为腾讯/高德地图经纬度
function qqMapTransBMap(lng, lat) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = lng;
    let y = lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta) + 0.0065;
    let lats = z * Math.sin(theta) + 0.006;
   
    return {
        lon: lngs,
        lat: lats 
    } 
}
export default {
  Toast,
}