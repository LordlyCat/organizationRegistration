const app = getApp();

Page({
    data: {
        anthorize: app.globalData.anthorize
    },
    onLoad: function() {
        let that = this;
        wx.getSetting({
            success: function(e) {
                wx.switchTab({
                    url: '../index/index'
                })
                if (wx.getStorageSync('nickName')) {
                    wx.switchTab({
                        url: '../index/index'
                    })
                    setTimeout(() => {

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
        console.log(222222333)
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