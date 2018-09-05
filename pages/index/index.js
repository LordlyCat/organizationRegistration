//index.js
//获取应用实例
const app = getApp()



Page({
    data: {
        anthorize: app.globalData.anthorize,
        loading: true,
        overflow: 'hidden',
        cover: 'coverOff',
        switch: true,
        add: true,
        orgnazition: [{
            name: "红岩网校工作站",
            logo: "../../img/redRockLogo.png",
            statement: ['产品策划运营部',
                '视觉设计部', 'Web研发部', '移动开发部', '运维安全部'
            ],
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "校团委宣传部",
            logo: '../../img/gongqingtuan.jpg',
            statement: ['校团委宣传部'],
            dec: "校团委宣传部是我校团委的重要部门，担负着向学校、校团委各学生组织传达信息的重要任务"
        }, {
            name: "校团委组织部",
            logo: '../../img/gongqingtuan.jpg',
            statement: ['校团委组织部'],
            dec: "重庆邮电大学团委组织部是校团委核心直属部室。"
        }, {
            name: "校团委办公室",
            logo: '../../img/gongqingtuan.jpg',
            statement: ['校团委办公室'],
            dec: "校团委办公室是共青团重庆邮电大学委员会直属机构之一。"
        }],
        wanted: 1,
        index: 0,
        information: {
            stuname: '',
            stuid: '',
            phonenum: ''
        },
        selectedNow: {
            index: 0,
            oname: '',
            dname: ''
        },
        selected: [],
        selectedIndex: 1
    },
    onLoad: function(e) {
        // if (!this.data.anthorize) {
        //     wx.hideTabBar();
        // }
        //wx.hideTabBar();
        //console.log(wx.getStorageSync('openid'));
        // if (!wx.getStorageSync('stuid')) {
        //     this.setData({
        //         switch: true,
        //         cover: 'coverOn'
        //     })
        //     wx.hideTabBar();
        // }
        // console.log(app.globalData.checkFlag);
        // if (app.globalData.checkFlag) {
        //     this.setData({
        //         cover: 'coverOff'
        //     })
        //     wx.showTabBar();
        // } else {
        //     this.setData({
        //         switch: true,
        //         cover: 'coverOn'
        //     })
        //     wx.hideTabBar();
        // }

        let that = this;
        wx.getSetting({
            success: function(e) {

                if (wx.getStorageSync('nickName')) {
                    // wx.switchTab({
                    //     url: '../index/index'
                    // })
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
                        // wx.switchTab({
                        //     url: '../index/index'
                        // })
                    }, 1500)
                } else {
                    app.globalData.anthorize = false;
                    that.setData({
                        anthorize: false
                    })

                }
            }
        })
        if (!this.data.anthorize) {
            wx.hideTabBar();
        }
    },
    onShow: function(e) {
        // console.log('onshow', app.globalData.checkFlag)
        // if (app.globalData.checkFlag) {
        //     this.setData({
        //         cover: 'coverOff'
        //     })
        //     wx.showTabBar();
        // } else {
        //     this.setData({
        //         switch: true,
        //         cover: 'coverOn'
        //     })
        //     wx.hideTabBar();
        // }
    },
    getUserInfoss: function(e) {
        //console.log(app.globalData.checkFlag)
        //console.log(e.detail.rawData);
        if (!app.globalData.checkFlag) {
            wx.hideTabBar();
            this.setData({
                switch: true,
                cover: 'coverOn'
            })
        } else {
            wx.showTabBar();
        }

        this.setData({
            anthorize: true
        })
        app.globalData.userInfo = JSON.parse(e.detail.rawData);
        wx.setStorage({
            key: "nickName",
            data: JSON.parse(e.detail.rawData).nickName
        })
        wx.setStorage({
            key: "avatarUrl",
            data: JSON.parse(e.detail.rawData).avatarUrl
        })
        // wx.switchTab({
        //     url: '../index/index'
        // })
    },
    register: function(e) {
        wx.hideTabBar();
        console.log(e);
        let data = this.data;
        this.setData({
            index: e.currentTarget.dataset.index,
            cover: 'coverOn',
            overflow: 'hidden',
            switch: false,
            add: true,
            selectedNow: {
                oname: data.orgnazition[e.currentTarget.dataset.index].name,
                dname: data.orgnazition[e.currentTarget.dataset.index].statement[0]
            }
        })
    },
    addWanted: function(e) {
        let wanted = ++this.data.wanted
        this.setData({
            wanted: wanted
        })
    },
    cancel: function(e) {
        this.setData({
            selected: [],
            cover: 'coverOff',
            wanted: 1
        });
        wx.showTabBar();
    },
    selectStatement: function(e) {
        let data = this.data;
        console.log(e.currentTarget.dataset.index)
        this.setData({
            add: false,
            selectedIndex: e.currentTarget.dataset.index,
            selectedNow: {
                oname: data.orgnazition[data.index].name,
                dname: data.orgnazition[data.index].statement[0]
            }
        })
    },
    submitInformation: function() {

        let flag = false;
        let obj = this.data.information;
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        Object.keys(obj).forEach(function(key) {
            if (key !== 'phonenum') {
                if (obj[key].length === 0 || re.test(obj[key])) {
                    flag = true;
                    return;
                }
            }

        })

        if (flag) {
            wx.showModal({
                title: '绑定失败',
                content: '必填项内容不能为空',
                showCancel: false
            })
        } else {
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            wx.request({
                url: 'https://bmtest.redrock.team/user/adduser',
                data: {
                    ...obj,
                    openid: wx.getStorageSync('openid')
                },
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                    console.log("seccess", res.header.authorization);
                    if (!res.header.authorization) {
                        console.log("sign fail");
                        wx.hideLoading();
                        wx.showModal({
                            title: '绑定失败',
                            content: '请重试',
                            showCancel: false
                        })
                        return;
                    }
                    wx.setStorage({
                        key: "authorization",
                        data: res.header.authorization
                    })
                    wx.hideLoading();
                    wx.showToast({
                        title: '绑定成功',
                        icon: 'success',
                        duration: 2000,
                        mask: true
                    })
                    this.setData({
                        overflow: 'visible',
                        cover: 'coverOff'
                    });
                    wx.showTabBar();
                    wx.setStorage({
                        key: "stuid",
                        data: obj.stuid
                    });
                    wx.setStorage({
                        key: "phonenum",
                        data: obj.phonenum
                    });
                    wx.setStorage({
                        key: "stuname",
                        data: obj.stuname
                    })
                },
                fail: (res) => {
                    console.log("fail", res);
                    wx.showModal({
                        title: '绑定失败',
                        content: '请重试',
                        showCancel: false
                    })
                },
                complete: (res) => {

                }
            })
        }
    },
    getInput: function(e) {
        switch (e.target.id) {
            case "stuname":
                this.setData({
                    information: {
                        ...this.data.information,
                        stuname: e.detail.value
                    }
                })
                break;
            case "stuid":
                this.setData({
                    information: {
                        ...this.data.information,
                        stuid: e.detail.value
                    }
                })
                break;
            case "phonenum":
                this.setData({
                    information: {
                        ...this.data.information,
                        phonenum: e.detail.value
                    }
                })
                break;
            default:
                console.log(false);
                break;
        }
    },
    quitSelect: function(e) {
        this.setData({
            // cover: 'coverOff',
            overflow: 'visible',
            switch: false,
            add: true
        })
    },
    chooseStatement: function(e) {

        let data = this.data;

        this.setData({
            selectedNow: {
                //index: 0,
                //openid: wx.getStorageSync('openid'),
                oname: data.orgnazition[data.index].name,
                dname: data.orgnazition[data.index].statement[e.detail.value[0]]
            }
        })

    },
    checkSelected: function(e) {
        let selected = this.data.selected;

        if (selected.length <= this.data.wanted) {
            //selected.push(this.data.selectedNow);
            selected[this.data.selectedIndex] = this.data.selectedNow
        }

        this.setData({
            selected: selected,
            add: true
        }, function(e) {
            //console.log(that.data.selected);
            // wx.showToast({
            //     title: '添加成功',
            //     icon: 'success',
            //     duration: 1000,
            //     mask: false
            // })
        })
    },
    send: function(e) {
        let that = this;
        console.log(this.data.selected)
        let selected = this.data.selected;
        if (selected.length === 0) {
            return
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        this.setData({
            wanted: 1,
            selected: []
        });
        let promises = selected.map(function(e) {
            return new Promise(function(resolve, reject) {
                wx.request({
                    // 必需
                    url: 'https://bmtest.redrock.team/msg/choose',
                    data: {
                        ...e,
                        openid: wx.getStorageSync('openid')
                    },
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        authorization: wx.getStorageSync('authorization')
                    },
                    success: (res) => {

                        console.log(res);

                        if (res.data == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    },
                    fail: (res) => {
                        console.log(res);
                    },
                    complete: (res) => {

                    }
                })
            })
        })
        Promise.all(promises).then(function(e) {
            console.log(1111111)
            wx.hideLoading();
            wx.showToast({
                title: '报名成功',
                icon: 'success',
                duration: 2000,
                mask: true
            });
            that.setData({
                cover: "coverOff"
            })
            wx.showTabBar();
        }).catch(function(err) {

            console.log(err);
            console.log('0000000');
            wx.hideLoading();
            wx.showToast({
                title: '报名失败',
                icon: 'success',
                duration: 2000,
                mask: true
            })
        })
    },
    getUserInfo: function(e) {}
})



// End