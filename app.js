//app.js
App({
    onLaunch: function() {

        // 登录
        if (wx.getStorageSync('openid')) {
            return false;
        }
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session',
                        data: {
                            appid: 'wx7c423545fff03d77',
                            secret: 'fcae9e3519f9036cc404c1685b9a28aa',
                            js_code: res.code,
                            grant_type: 'authorization_code'
                        },
                        method: 'GET',
                        success: function(res) {
                            wx.setStorage({
                                key: "openid",
                                data: res.data.openid
                            })
                        }
                    })
                }
            }
        })
        // 获取用户信息
        // let that = this;
        // wx.getSetting({
        //     success: function(e) {
        //         console.log(e);

        //         if (e.authSetting['scope.userInfo']) {
        //             wx.getUserInfo({
        //                 success: function(e) {
        //                     that.globalData.userInfo = JSON.parse(e.rawData);
        //                     console.log(JSON.parse(e.rawData))
        //                 }
        //             })
        //         } else {
        //             // wx.navigateTo({
        //             //     url: '../loading/loading'
        //             // })
        //         }
        //     }
        // })

    },
    globalData: {
        userInfo: null,
        "tabBar": {
            "list": [{
                "pagePath": "pages/find/find",
                "text": "发现",
                "iconPath": "img/icon1.png",
                "selectedIconPath": "img/icon1_on.png",
                "selected": false
            }, {
                "pagePath": "pages/index/index",
                "text": "报名",
                "iconPath": "img/icon2.png",
                "selectedIconPath": "img/icon2_on.png",
                "selected": true
            }, {
                "pagePath": "pages/me/me",
                "text": "我的",
                "iconPath": "img/icon3.png",
                "selectedIconPath": "img/icon3_on.png",
                "selected": false
            }]

        }
    },
    onShow: function(e) {

    }
})