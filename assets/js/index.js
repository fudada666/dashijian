$(function () {
  getUserInfo();

  // 点击按钮，实现退出功能
  $("#btnLogout").on("click", function () {
    // 提示用户是否确认退出
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem("token");
        // 2. 重新跳转到登录页面
        location.href = "/login.html";

        // 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers 就是请求头配置对象
    // headers:{
    //     Authorization:localStorage.getItem('token')
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      renderAvatar(res.data);
    },
    
  });
}

function renderAvatar(user) {
  const name = user.nickname || user.username;
  $("#welcome").html(`欢迎 ${name}`);

  if (user.user_pic) {
    // 图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 文字头像
    const first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
    $(".layui-nav-img").hide();
  }
}
