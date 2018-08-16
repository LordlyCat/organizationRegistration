//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        overflow: 'hidden',
        cover: 'coverOff',
        switch: true,
        src: {
            src_1: "../../img/icon1.png",
            src_2: "../../img/icon2_on.png",
            src_3: "../../img/icon3.png"
        },
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
        index: 0,
        information: {
            stuname: '',
            stuid: '',
            phonenum: ''
        },
        // redRockStatement: {
        //     all: [0, 1, 2, 3, 4],
        //     selected: [],
        //     selectedNow: [0],
        //     init: true
        // },
        selected: {
            index: 0,
            oname: '',
            dname: ''
        }
    },
    onLoad: function(e) {
        //console.log(wx.getStorageSync('openid'));
        if (!wx.getStorageSync('stuid')) {
            this.setData({
                switch: true,
                cover: 'coverOn'
            })
        }
        // wx.request({
        //     // 必需
        //     url: 'http://eycjvk.natappfree.cc/user/adduser',
        //     data: {
        //         openid: wx.getStorageSync('openid'),
        //         stuname: "123",
        //         stuid: 893468,
        //         phonenum: 290358
        //     },
        //     method: 'POST',
        //     header: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     success: (res) => {
        //         console.log("seccess", res.header.authorization);
        //     },
        //     fail: (res) => {
        //         console.log("fail", res);
        //     },
        //     complete: (res) => {
        //         //console.log("finished", res);
        //     }
        // })
    },
    register: function(e) {
        console.log(e);
        let data = this.data;
        this.setData({
            index: e.currentTarget.dataset.index,
            cover: 'coverOn',
            overflow: 'hidden',
            switch: false,
            selected: {
                oname: data.orgnazition[e.currentTarget.dataset.index].name,
                dname: data.orgnazition[e.currentTarget.dataset.index].statement[0]
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

            wx.request({
                url: 'http://h6ekj4.natappfree.cc/user/adduser',
                data: {
                    ...obj,
                    openid: wx.getStorageSync('openid')
                },
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                    //console.log("seccess", res.header.authorization);
                    if (!res.header.authorization) {
                        console.log("sign fail");
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
                    wx.setStorage({
                        key: "stuid",
                        data: obj.stuid
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
        //console.log(this.data.information)
    },
    quitSelect: function(e) {
        this.setData({
            cover: 'coverOff',
            overflow: 'visible',
            switch: false
        })
    },
    chooseStatement: function(e) {
        console.log(e.detail.value);

        let data = this.data;

        this.setData({
            selected: {
                //index: 0,
                //openid: wx.getStorageSync('openid'),
                oname: data.orgnazition[data.index].name,
                dname: data.orgnazition[data.index].statement[e.detail.value[0]]
            }
        })

    },
    checkSelected: function(e) {
        console.log({ ...this.data.selected,
            openid: wx.getStorageSync('openid')
        });
        wx.request({
            // 必需
            url: '',
            data: {
                ...this.data.selected,
                openid: wx.getStorageSync('openid')
            },
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: wx.getStorageSync('authorization')
            },
            success: (res) => {

            },
            fail: (res) => {

            },
            complete: (res) => {

            }
        })
        // let oldSelected = this.data.redRockStatement.selected;
        // let newSelected = newSelected = new Set(oldSelected);
        // let selectedNow = this.data.redRockStatement.selectedNow;

        // newSelected.add(this.data.redRockStatement.selectedNow[0]);

        // this.setData({
        //     redRockStatement: {
        //         ...this.data.redRockStatement,
        //         selected: newSelected
        //     }
        // }, function(e) {
        //     wx.showToast({
        //         title: '报名成功',
        //         icon: 'success',
        //         duration: 2000,
        //         mask: true
        //     })
        // })

    },
    ch: function(e) {
        console.log(this.data.redRockStatement.selected)
    },
    getUserInfo: function(e) {}
})



// End