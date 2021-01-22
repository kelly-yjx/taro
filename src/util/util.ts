import Taro from '@tarojs/taro'

//提示
export const Toast = (title: any, duration = 1500, mask = true, icon: any = 'none') => {
    Taro.showToast({
        title,
        duration,
        mask,
        icon
    })
}
// 设置缓存
export const setStorage = (name: string, data: any) => {
    try {
        return Taro.setStorageSync(name, data)
    } catch (e) { }
}
// 获取缓存
export const getStorage = (name) => {
    try {
        var value = Taro.getStorageSync(name)
        if (value) {
            return Taro.getStorageSync(name)
        }
    } catch (e) {
    }
}
// 删除缓存
export const removeStorage = (name) => {
    try {
        return Taro.removeStorageSync(name)
    } catch (e) {
    }
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





// 防抖
export const debounce = (fn, time) => {
    let timer: any;
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



