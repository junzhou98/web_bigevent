$(function () {
    var layer = layui.layer
    getUserInfo()
    //点击按钮实现退出功能
    $("#btnLogout").on("click", function () {
        //提示用户是否退出
        layer.confirm('是否确认退出!', { icon: 3, title: '提示' }, function (index) {
            //清空token
            localStorage.removeItem('token');
            //跳转到登录页
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index);
        });
    })

})
// 查看用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: { Authorization: localStorage.getItem("token") || '' },
        success: function (res) {
            console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!');
            }
            renderAvatar(res.data)
        },
        //控制用户访问权限
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //清空token
        //         localStorage.removeItem('token');
        //         //跳转到登录页
        //         location.href = '/login.html'
        //     }
           
        // }
    })
}



//渲染用户头像
function renderAvatar(user) {
    // 1获取用户的名称
    var name = user.nickname || user.username;
    // 2设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    //3按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show()
        //文字头像隐藏
        $(".text-avatar").hide();
    } else {
        // 3.2渲染文字头像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show();
    }
}

