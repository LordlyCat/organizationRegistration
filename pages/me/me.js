const app = getApp()
//let name = app.globalData.userInfo.nickName;
//console.log(app.globalData.userInfo)
Page({
    data: {
        cover: false,
        modifyCover: false,
        modify: false,
        delete: false,
        change: false,
        src: {
            src_1: "../../img/icon1.png",
            src_2: "../../img/icon2.png",
            src_3: "../../img/icon3_on.png"
        },
        nickame: '',
        avatarUrl: '',
        stuname: '',
        stuid: '',
        phonenum: '',
        moreClassName1: 'more',
        more1: '../../img/more.png',
        moreClassName2: 'pick',
        more2: '../../img/pick.png',
        orgnazition: [],
        newPersonal: {
            stuname: '',
            stuid: '',
            phonenum: ''
        },
        deleteName: {},
        modifyName: {},
        orz: [{
            name: "红岩网校工作站",
            statement: ['产品策划运营部', '视觉设计部', 'Web研发部', '移动开发部', '运维安全部']
        }, {
            name: "校团委宣传部",
            statement: ['校团委宣传部']
        }, {
            name: "校团委组织部",
            statement: ['校团委组织部']
        }, {
            name: "校团委办公室",
            statement: ['校团委办公室']
        }],
        thisOrz: {}
    },
    dealData: function(arr) { //数据处理
        let data = [];
        if (arr.length === 0) {
            return data;
        }
        arr.forEach((item) => {
            let oname = item.oname;
            let l = data.length;

            if (l === 0) {
                data.push({
                    oname: item.oname,
                    show: false,
                    statement: [{
                        index: l,
                        dname: item.dname,
                        show: false,
                        news: item.info,
                        see: item.see
                    }]

                })
                return;
            }

            for (var i = 0; i < data.length; i++) {
                if (data[i].oname === oname) {
                    data[i].statement.push({
                        index: i,
                        dname: item.dname,
                        show: false,
                        news: item.info,
                        see: item.see
                    })
                    break;
                }
                if (data[i].oname !== oname && i === data.length - 1) {
                    data.push({
                        oname: item.oname,
                        show: false,
                        statement: [{
                            index: l,
                            dname: item.dname,
                            show: false,
                            news: item.info,
                            see: item.see
                        }]

                    })
                    break;
                }
            }
        })
        //console.log(data);
        return data;
    },
    onLoad: function(e) {
        this.getOrz();
    },
    onReady: function(e) {

        let nickName = wx.getStorageSync('nickName')
        this.setData({
            nickName: wx.getStorageSync('nickName'),
            avatarUrl: wx.getStorageSync('avatarUrl'),
            stuid: wx.getStorageSync('stuid'),
            phonenum: wx.getStorageSync('phonenum'),
        })
    },
    onShow: function(e) {
        this.getOrz();
    },
    getOrz: function(e) {
        let that = this;
        wx.request({
            // 必需
            url: 'https://bmtest.redrock.team/msg/cinfo',
            data: {
                openid: wx.getStorageSync('openid')
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: wx.getStorageSync('authorization')
            },
            method: 'POST',
            success: (res) => {
                console.log(res);

                that.setData({
                    orgnazition: that.dealData(res.data)
                })
            },
            fail: (res) => {

            },
            complete: (res) => {

            }
        })
    },
    showStatement: function(e) {
        //console.log(e.currentTarget.dataset.name, e.currentTarget.dataset.index);
        let index = parseInt(e.currentTarget.dataset.index, 10);
        let arr = this.data.orgnazition;
        //console.log(arr[index].show);
        if (arr[index].show) {
            arr[index].show = false;
            for (let value of arr[index].statement) {
                //console.log(value)
                value.show = false;
            }
        } else {
            arr[index].show = true;
        }

        this.setData({
            orgnazition: arr
        });
    },
    showNews: function(e) {
        let index = parseInt(e.currentTarget.dataset.index, 10);
        let orIndex = parseInt(e.currentTarget.dataset.orindex, 10);
        let arr = this.data.orgnazition;

        if (arr[orIndex].statement[index].show) {
            arr[orIndex].statement[index].show = false;
        } else {
            arr[orIndex].statement[index].show = true;
        }

        this.setData({
            orgnazition: arr
        });
    },
    gotoModify: function(e) {
        this.setData({
            modify: true
        })
    },
    quitChange: function(e) {
        console.log(e)
        this.setData({
            modify: false
        })
    },
    modifyPersonal: function(e) {
        wx.hideTabBar();
        this.setData({
            cover: true,
            stuid: wx.getStorageSync('stuid'),
            phonenum: wx.getStorageSync('phonenum'),
            stuname: wx.getStorageSync('stuname'),
            newPersonal: {
                stuname: '',
                stuid: '',
                phonenum: ''
            }
        })
    },
    quitModifyP: function(e) {
        wx.showTabBar();
        this.setData({
            cover: false
        })
    },
    getInput: function(e) {
        switch (e.target.id) {
            case "stuname":
                this.setData({
                    newPersonal: {
                        ...this.data.newPersonal,
                        stuname: e.detail.value
                    }
                })
                break;
            case "stuid":
                this.setData({
                    newPersonal: {
                        ...this.data.newPersonal,
                        stuid: e.detail.value
                    }
                })
                break;
            case "phonenum":
                this.setData({
                    newPersonal: {
                        ...this.data.newPersonal,
                        phonenum: e.detail.value
                    }
                })
                break;
            default:
                console.log(false);
                break;
        }
        console.log(this.data.newPersonal)
    },
    checkModifyPersonal: function(e) {
        let that = this;
        let newPersonal = this.data.newPersonal
        let flag = false;
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        Object.keys(newPersonal).forEach(function(key) {
            if (key !== 'phonenum') {
                if (newPersonal[key].length === 0 || re.test(newPersonal[key])) {
                    flag = true;
                    return;
                }
            }
        })

        if (flag) {
            wx.showModal({
                title: '修改失败',
                content: '必填项内容不能为空',
                showCancel: false
            })
            return;
        }
        wx.request({

            url: 'https://bmtest.redrock.team/user/updateuser',
            data: {
                ...newPersonal,
                openid: wx.getStorageSync('openid')
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: wx.getStorageSync('authorization')
            },
            method: 'POST',
            success: (res) => {
                console.log(res);
                if (res.data == 'success') {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 1200,
                        mask: true
                    })
                    that.setData({
                        stuname: newPersonal.stuname,
                        stuid: newPersonal.stuid,
                        phonenum: newPersonal.phonenum
                    })
                    wx.setStorage({
                        key: "stuid",
                        data: newPersonal.stuid
                    })
                    wx.setStorage({
                        key: "phonenum",
                        data: newPersonal.phonenum
                    })

                    wx.setStorage({
                        key: 'stuname',
                        data: newPersonal.stuname
                    })
                    wx.showTabBar();
                } else {
                    wx.showModal({
                        title: '修改失败',
                        content: '请重试',
                        showCancel: false
                    })
                }
            },
            fail: (res) => {
                wx.showModal({
                    title: '修改失败',
                    content: '请重试',
                    showCancel: false
                })
            },
            complete: (res) => {
                that.setData({
                    cover: false
                })
            }
        })
    },
    deleteStatement: function(e) {
        let oname = this.data.orgnazition[e.target.dataset.orindex].oname;
        let dname = this.data.orgnazition[e.target.dataset.orindex].statement[e.target.dataset.index].dname
        this.setData({
            modifyCover: true,
            delete: true,
            deleteName: {
                openid: wx.getStorageSync('openid'),
                oname: oname,
                dname: dname
            }
        })

    },
    checkDelete: function(e) {
        let deleteName = this.data.deleteName;
        wx.request({
            // 必需
            url: 'https://bmtest.redrock.team/msg/dechoose',
            data: {
                ...deleteName,
                openid: wx.getStorageSync('openid')
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: wx.getStorageSync('authorization')
            },
            method: 'POST',
            success: (res) => {
                console.log(res)
                this.getOrz();
            },
            fail: (res) => {
                console.log(res)
            },
            complete: (res) => {

            }
        })
        this.setData({
            modifyCover: false,
            delete: false,
            deleteName: {}
        })
    },
    quitDelete: function(e) {
        this.setData({
            modifyCover: false,
            delete: false,
            deleteName: {}
        })
    },
    modifyStatement: function(e) {
        let oldOname = this.data.orgnazition[e.target.dataset.orindex].oname;
        let oldDname = this.data.orgnazition[e.target.dataset.orindex].statement[e.target.dataset.index].dname;

        this.setData({
            modifyCover: true,
            delete: false
        })

        let thisOrz = {};
        this.data.orz.forEach(function(e) {
            if (e.name === oldOname) {
                thisOrz = e;
                return;
            }
        })
        this.setData({
            thisOrz: thisOrz,
            modifyName: {
                length: thisOrz.statement.length,
                oldoname: oldOname,
                olddname: oldDname,
                newoname: oldOname,
                newdname: thisOrz.statement[0]
            }
        })
        console.log(this.data.modifyName)
    },
    quitModify: function(e) {
        this.setData({
            thisOrz: {},
            modifyCover: false,
            delete: false,
            modifyName: {}
        })
    },
    getPicker: function(e) {
        this.setData({
            modifyName: {
                ...this.data.modifyName,
                //index: e.detail.value[0],
                newdname: this.data.thisOrz.statement[e.detail.value[0]]
            }
        })
        console.log(this.data.modifyName)
    },
    checkChange: function(e) {
        let modifyName = this.data.modifyName;
        if (modifyName.olddname === modifyName.newdname) {
            wx.showModal({
                title: '修改后部门与原部门相同',
                content: '请重试',
                showCancel: false
            })
            return
        }
        wx.request({
            // 必需
            url: 'https://bmtest.redrock.team/msg/rechoose',
            data: {
                ...modifyName,
                openid: wx.getStorageSync('openid')
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: wx.getStorageSync('authorization')
            },
            method: 'POST',
            success: (res) => {
                if (res.data == 200) {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 1200,
                        mask: true
                    })
                    this.getOrz();
                    this.setData({
                        thisOrz: {},
                        modifyCover: false,
                        delete: false,
                        modifyName: {}
                    })
                } else {
                    wx.showModal({
                        title: '修改失败',
                        content: '请重试',
                        showCancel: false
                    })
                }
            },
            fail: (res) => {
                wx.showModal({
                    title: '修改失败',
                    content: '请重试',
                    showCancel: false
                })
            },
            complete: (res) => {

            }
        })
    }
})