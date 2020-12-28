// 注意:每次调用$.get() 或 $.post() 或 $.ajax()的时候
// 会先调用 ajaxPrefilter 这个函数
// 再这个函数中,可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 再发起真正的ajax请求之前,统一 拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})