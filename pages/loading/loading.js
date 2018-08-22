const app = getApp();

Page({
    data: {
        anthorize: app.globalData.anthorize
    },
    onLoad: function() {
        let that = this;
        wx.getSetting({
            success: function(e) {

                if (wx.getStorageSync('nickName')) {
                    setTimeout(() => {
                        // wx.request({
                        //     // 必需
                        //     url: 'https://bmtest.redrock.team/user/findbyopenid',
                        //     data: {
                        //         openid: wx.getStorageSync('openid')
                        //     },
                        //     header: {
                        //         'Content-Type': 'application/x-www-form-urlencoded'
                        //     },
                        //     method: 'POST',
                        //     success: (res) => {
                        //         console.log('user', res)
                        //         console.log(res.header.authorization)
                        //         wx.setStorage({
                        //             key: 'authorization',
                        //             data: res.header.authorization
                        //         })
                        //         wx.setStorage({
                        //             key: 'stuid',
                        //             data: res.data.stuid
                        //         })
                        //         wx.setStorage({
                        //             key: 'stuname',
                        //             data: res.data.stuname
                        //         })
                        //         wx.setStorage({
                        //             key: 'phonenum',
                        //             data: res.data.phonenum
                        //         })
                        //     },
                        //     fail: (res) => {
                        //         console.log(res)
                        //     },
                        //     complete: (res) => {

                        //     }
                        // })
                        wx.switchTab({
                            url: '../index/index'
                        })
                    }, 1500)
                } else {
                    app.globalData.anthorize = false;
                    that.setData({
                        anthorize: false
                    })

                }
            }
        })
    },
    getUserInfo: function(e) {
        console.log(e.detail.rawData);
        app.globalData.userInfo = JSON.parse(e.detail.rawData);
        wx.setStorage({
            key: "nickName",
            data: JSON.parse(e.detail.rawData).nickName
        })
        wx.setStorage({
            key: "avatarUrl",
            data: JSON.parse(e.detail.rawData).avatarUrl
        })
        wx.switchTab({
            url: '../index/index'
        })
    }
});