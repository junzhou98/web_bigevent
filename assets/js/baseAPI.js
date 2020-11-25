$.ajaxPrefilter(function (options) {
    // 在ajaxPrefilter中统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url)
    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    // 统一挂载complete回调函数
    options.complete = function (res) {
        console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            //强制跳转页面
            // location.href = '/login.html'
        }
    }
})