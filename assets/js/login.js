$(function () {
    // 点击去注册按钮
    $('#link_reg').on('click',function () {
        $('.login-box').hide();
        $('.reg-box').show()
    })

    // 点击去登录按钮
    $('#link_login').on('click',function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })

    // const form = layui.form;
    // const layer = layui.layer;
    const { form, layer }= layui;
    
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6-12位,且不能出现空格'],
        repwd:function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function (e) {
        e.preventDefault();  // 阻止默认提交行为

        $.ajax({
            url:'/api/reguser',
            method:'POST',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val(),
            },
            success:function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                    return;
                }
                layer.msg('注册成功');
                // 自动跳转登录页面
                $('#link_login').click();
            }
        })
    })

    $('#form_login').on('submit',function (e) {
        e.preventDefault();

        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                    return
                }

                layer.msg('登录成功')
                localStorage.setItem('token',res.token); // 保存至浏览器本地
                location.href = '/index.html'; // 跳转页面
            }
        })
    })
})