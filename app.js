//app.js
App({

    onLaunch: function() {

        // 登录
        if (wx.getStorageSync('openid')) {
            let that = this;
            this.checkUser(wx.getStorageSync('openid'));

            if (!wx.getStorageSync('nickName')) {
                wx.navigateTo({
                    url: './pages/loading/loading'
                })
                that.globalData.anthorize = true;

            }
            return false;
        }
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    //拿openID
                    wx.request({
                        url: 'https://bmtest.redrock.team/user/getopenid',
                        data: {
                            code: res.code,
                        },
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success: function(res) {
                            console.log(res);
                            wx.setStorage({
                                key: "openid",
                                data: res.data
                            })
                        }
                    })
                }
            }
        })

    },
    checkUser: function(openid) {
        //console.log('checkUser')
        wx.request({
            // 必需
            url: 'https://bmtest.redrock.team/user/findbyopenid',
            data: {
                openid: openid
            },
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                //console.log('authorization', res);
                if (res.header.authorization) {
                    this.globalData.checkFlag = true;
                }
                wx.setStorage({
                    key: "authorization",
                    data: res.header.authorization
                })
                wx.setStorage({
                    key: "stuid",
                    data: res.data.stuid
                })
                wx.setStorage({
                    key: "phonenum",
                    data: res.data.phonenum
                })
            },
            fail: (res) => {

            },
            complete: (res) => {

            }
        })
    },
    globalData: {
        anthorize: true,
        checkFlag: false,
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