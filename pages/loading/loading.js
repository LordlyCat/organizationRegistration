const app = getApp();

Page({
    data: {
        anthorize: true
    },
    onLoad: function() {
        let that = this;
        wx.getSetting({
            success: function(e) {
                if (e.authSetting['scope.userInfo']) {
                    wx.navigateTo({
                        url: '../index/index'
                    })
                } else {
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
        wx.navigateTo({
            url: '../index/index'
        })
    }
});