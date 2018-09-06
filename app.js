//app.js
App({

    onLaunch: function() {
        //wx.hideTabBar();
        // 登录
        if (wx.getStorageSync('openid')) {
            let that = this;
            this.checkUser(wx.getStorageSync('openid'));

            if (wx.getStorageSync('nickName')) {
                // wx.navigateTo({
                //     url: './pages/loading/loading'
                // })
                that.globalData.anthorize = true;
            }
            return false;
        }

        let that = this;
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
                            that.checkUser(res.data);
                            wx.setStorage({
                                key: "openid",
                                data: res.data,
                                success: () => {
                                    console.log('openid:', res.data)
                                }
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
                if (res.header.Authorization) {

                    this.globalData.checkFlag = true;
                    console.log('checkUser:', this.globalData.checkFlag)
                    wx.setStorage({
                        key: "Authorization",
                        data: res.header.Authorization
                    })
                    wx.setStorage({
                        key: "stuid",
                        data: res.data.stuid
                    })
                    wx.setStorage({
                        key: "phonenum",
                        data: res.data.phonenum
                    })

                    wx.setStorage({
                        key: 'stuname',
                        data: res.data.stuname
                    })
                } else {
                    wx.hideTabBar();
                }

            },
            fail: (res) => {},
            complete: (res) => {}
        })
    },
    globalData: {
        anthorize: false,
        checkFlag: false,
        userInfo: null
    },
    onShow: function(e) {
        //wx.hideTabBar();
    }
})