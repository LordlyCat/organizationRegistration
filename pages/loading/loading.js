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
                        wx.navigateTo({
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
        wx.navigateTo({
            url: '../index/index'
        })
    }
});