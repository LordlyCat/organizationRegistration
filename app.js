//app.js
App({
    globalData: {
        anthorize: false,
        checkFlag: false,
        userInfo: null
    },
    onLaunch: function() {
        // 登录
        if (wx.getStorageSync('openid')) {
            //this.checkUser(wx.getStorageSync('openid'));

            if (wx.getStorageSync('nickName')) {
                this.globalData.anthorize = true;
            }
            return false;
        }
        let that = this;
        wx.login({
            success: res => {
                console.log(res)
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
    onShow: function(e) {
        if (wx.getStorageSync('openid')) {
            this.checkUser(wx.getStorageSync('openid'));
            this.getNewNews();
        }
    },
    checkUser: function(openid) {
        wx.request({
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

                    this.getNewNews();
                } else {
                    wx.hideTabBar();
                }

            },
            fail: (res) => {},
            complete: (res) => {}
        })
    },
    getNewNews: function(e) {
        wx.request({
            url: 'https://bmtest.redrock.team/msg/cinfo',
            data: {
                openid: wx.getStorageSync('openid')
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: wx.getStorageSync('Authorization')
            },
            method: 'POST',
            success: (res) => {
                let newFlag = false;
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].see === 0) {
                        console.log("new");
                        newFlag = true;
                        wx.showTabBarRedDot({
                            index: 2
                        })
                        break;
                    }
                }
                if (!newFlag) {
                    wx.hideTabBarRedDot({
                        index: 2
                    })
                }
            },
            fail: (res) => {

            },
            complete: (res) => {

            }
        })
    },
    checkInput: function(obj) {
        let emptyFlag = false;
        let effectiveIDFlag = false;
        let effectivePhoneFlag = false;
        let regu = "^[ ]+$";
        let re = new RegExp(regu);

        Object.keys(obj).forEach(function(key) {
            //检查是否为空
            if (obj[key].length === 0 || re.test(obj[key])) {
                emptyFlag = true;
                return;
            }

            //检查学号
            if (key === 'stuid' && obj[key].length === 10 && obj[key].toString().slice(0, 3) === '201') {
                effectiveIDFlag = true
            }

            //检查手机号
            if (key === 'phonenum' && obj[key].length === 11 && obj[key].toString().slice(0, 1) === '1') {
                effectivePhoneFlag = true
            }
        })

        if (emptyFlag) {
            wx.showModal({
                title: '绑定失败',
                content: '必填项内容不能为空',
                showCancel: false
            })
        } else if (!effectiveIDFlag) {
            wx.showModal({
                title: '绑定失败',
                content: '学号不合法',
                showCancel: false
            })
        } else if (!effectivePhoneFlag) {
            wx.showModal({
                title: '绑定失败',
                content: '手机号码不合法',
                showCancel: false
            })
        } else {
            return true;
        }
    }
})