//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        anthorize: app.globalData.anthorize,
        loading: true,
        overflow: '',
        cover: 'coverOff',
        switch: true,
        add: true,
        QR: false,
        QR_code: 0,
        disabled: false,
        orgnazition: [{
            name: "校团委办公室",
            logo: '../../img/gongqingtuan.jpg',
            statement: ['校团委办公室'],
            dec: "校团委办公室是共青团重庆邮电大学委员会直属机构之一。"
        }, {
            name: "校团委组织部",
            logo: '../../img/gongqingtuan.jpg',
            statement: ['校团委组织部'],
            dec: "重庆邮电大学团委组织部是校团委核心直属部室。"
        }, {
            name: "校团委宣传部",
            logo: '../../img/gongqingtuan.jpg',
            statement: ['校团委宣传部'],
            dec: "校团委宣传部是我校团委的重要部门，担负着向学校、校团委各学生组织传达信息的重要任务。"
        }, {
            name: "校学生会",
            logo: "../../img/xsh.jpg",
            statement: ['综合部', '学习部', '宣传部', '权益提案部', '生活服务部', '文艺部', '体育部', '女生部'],
            dec: "学生会是由校党委、市学联领导，由校团委具体指导的群众性组织。"
        }, {
            name: "学生科技联合会",
            logo: "../../img/xskjlhh.png",
            statement: ['综合部', '科技人文部', '项目管理部', '媒体运营部', '科创竞赛部', '信息部'],
            dec: "重庆邮电大学学生科技联合会简称学生科联。"
        }, {
            name: "学生社团联合会",
            logo: "../../img/xsstlhh.png",
            statement: ['综合部', '宣传部', '社团服务部', '社团活动部'],
            dec: "重庆邮电大学学生社团联合会在校团委的直接指导下，管理社团工作、服务社团发展的学生组织。"
        }, {
            name: "青年志愿者协会",
            logo: "../../img/qnzyzxh_banner.jpg",
            statement: ['综合管理部', '青年志愿者服务总队', '实践服务部', '宣传推广部'],
            dec: "重庆邮电大学青年志愿者协会是校团委直属管辖的七大学生组织之一。"
        }, {
            name: "红岩网校工作站",
            logo: "../../img/redRockLogo.png",
            statement: ['产品策划及运营部',
                '视觉设计部', 'Web研发部', '移动开发部', '运维安全部'
            ],
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "大学生艺术团",
            logo: "../../img/dxsyst.jpg",
            statement: ['管乐团', '民乐团', '舞蹈团', '合唱团', '话剧团', '综合部'],
            dec: "重庆邮电大学大学生艺术团是在校团委直接指导管理下的学生艺术团体。"
        }, {
            name: "勤工助学中心",
            logo: "../../img/qgzxzx.png",
            statement: ['行政部', '宣传部', '策划部', '对外联络部', '失物招领部', '学生超市', '绿色书屋', '学生打印社', '文化产品部'],
            dec: "勤工助学中心隶属于重庆邮电大学党委学工部/学生处，在重邮学生资助管理中心的指导下开展工作。"
        }, {
            name: "重邮就业中心",
            logo: "../../img/jyzx.png",
            statement: ['综合支撑组', '对外活动组', '媒体运营组'],
            dec: '重邮就业中心将在10月28日开放报名，敬请期待。'
        }],
        wanted: 1,
        index: 0,
        information: {
            idnum: '',
            stuid: '',
            phonenum: ''
        },
        selectedNow: {
            index: 0,
            oname: '',
            dname: ''
        },
        selected: [{
            dname: '选择部门'
        }],
        selectedIndex: 1
    },
    onLoad: function(e) {
        let that = this;
        wx.getSetting({
            success: function(e) {

                if (wx.getStorageSync('nickName')) {

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

        //获取二维码参数
        if (e.id) {
            this.setData({
                QR: true,
                QR_code: e.id
            })
            this.goToJoin(e.id);
        }
    },
    onShow: function(e) {

    },
    getUserInfoss: function(e) {
        console.log(e);
        if (!app.globalData.checkFlag) {
            wx.hideTabBar();
            this.setData({
                switch: true,
                cover: 'coverOn'
            })
        } else if (this.data.QR) {
            wx.hideTabBar();
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
    },
    register: function(e) {
        if (e.currentTarget.dataset.index === 10 &&
            new Date().setFullYear(2018, 9, 28) - new Date() > 0) {
            return;
        }
        this.goToJoin(e.currentTarget.dataset.index);
    },
    goToJoin: function(e) {
        wx.hideTabBar();
        let data = this.data;
        this.setData({
            index: e,
            cover: 'coverOn',
            overflow: 'hidden',
            switch: false,
            add: true,
            selectedNow: {
                oname: data.orgnazition[e].name,
                dname: data.orgnazition[e].statement[0]
            }
        })
    },
    addWanted: function(e) {
        console.log(this.data.orgnazition[this.data.index].statement.length, this.data.wanted);
        if (this.data.orgnazition[this.data.index].statement.length <= this.data.wanted) {
            return false;
        }
        let wanted = ++this.data.wanted;
        let selected = this.data.selected;
        selected[wanted - 1] = {
            dname: '选择部门'
        }
        this.setData({
            wanted: wanted,
            selected: selected
        })
    },
    cancel: function(e) {
        this.setData({
            selected: [{
                dname: '选择部门'
            }],
            cover: 'coverOff',
            overflow: 'visible',
            wanted: 1
        });
        wx.showTabBar();
    },
    selectStatement: function(e) {
        let data = this.data;
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
        let obj = this.data.information;
        let title = '绑定失败';
        if (app.checkInput(obj, title)) {
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
                    console.log("seccess", res);
                    if (!res.header.Authorization) {
                        if (res.data.status === 201) {
                            wx.showModal({
                                title: '身份证后六位错误',
                                content: '请重试',
                                showCancel: false
                            })
                        }
                        if (res.data.status === -100) {
                            wx.showModal({
                                title: '学号不合法',
                                content: '请重试',
                                showCancel: false
                            })
                        }
                        wx.hideLoading();
                        return;
                    }
                    wx.setStorage({
                        key: "Authorization",
                        data: res.header.Authorization,
                        success: () => {
                            console.log("setFirst")
                        }
                    });
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
                    // wx.setStorage({
                    //     key: "stuname",
                    //     data: obj.stuname
                    // });
                    if (this.data.QR) {
                        this.goToJoin(this.data.QR_code)
                    }
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
            case "idnum":
                this.setData({
                    information: {
                        ...this.data.information,
                        idnum: e.detail.value
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
            overflow: 'hidden',
            switch: false,
            add: true
        })
    },
    chooseStatement: function(e) {
        console.log('choose:', e);
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

        })
    },
    move: function(e) {
        //避免微信垃圾控件因滑动过快不能及时获取到值
        this.setData({
            disabled: true
        })
        let that = this;
        setTimeout(function(e) {
            that.setData({
                disabled: false
            })
        }, 1000)
    },
    send: function(e) {
        let that = this;
        console.log(this.data.selected)
        let selected = this.data.selected;
        let dataArr = [];
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].oname) {
                dataArr[i] = selected[i]
            }
        }
        if (dataArr.length === 0) {
            return
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })

        let promises = dataArr.map(function(e) {
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
                        Authorization: wx.getStorageSync('Authorization')
                    },
                    success: (res) => {
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
        Promise
            .all(promises)
            .then(function(e) {
                // wx.showToast({
                //     title: '报名成功',
                //     icon: 'success',
                //     duration: 1250,
                //     mask: true
                // });
                wx.showModal({
                    title: '报名成功',
                    content: '',
                    showCancel: false
                })
                that.setData({
                    cover: "coverOff",
                    overflow: 'visible',
                })
                wx.showTabBar();
                wx.hideLoading();
                that.setData({
                    wanted: 1,
                    selected: [{
                        dname: '选择部门'
                    }]
                });
            })
            .catch(function(err) {

                console.log(err);
                // wx.showToast({
                //     title: '报名失败',
                //     icon: 'success',
                //     duration: 2000,
                //     mask: true
                // })
                wx.showModal({
                    title: '报名失败',
                    content: '',
                    showCancel: false
                })
                wx.hideLoading();
                that.setData({
                    wanted: 1,
                    selected: [{
                        dname: '选择部门'
                    }]
                });
            })
    },
    getUserInfo: function(e) {}
})



// End