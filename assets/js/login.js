$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    //自定义校验规则
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        // 密码的自定义校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //确认密码框的校验规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })
    //监听注册表单的提交事件
    $("#form-reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        };
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录!')
        })
        $("#link_login").click()
    })

    // 监听表单登录表单的提交事件
    $("#form-login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            //快速获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    layer.msg(res.message)

                }
                layer.msg("登录成功!")
                //将登录成功得到的token字符串,保存到localStorage中
                localStorage.setItem("token", res.token);
                location.href='/index.html'

            }

        })
    })
})