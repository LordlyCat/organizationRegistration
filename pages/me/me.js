const app = getApp()
//let name = app.globalData.userInfo.nickName;
//console.log(app.globalData.userInfo)
Page({
    data: {
        src: {
            src_1: "../../img/icon1.png",
            src_2: "../../img/icon2.png",
            src_3: "../../img/icon3_on.png"
        },
        nickame: '',
        avatarUrl: '',
        stuid: '',
        phonenum: '',
        moreClassName1: 'more',
        more1: '../../img/more.png',
        moreClassName2: 'pick',
        more2: '../../img/pick.png',
        orgnazition: [{
            name: '红岩网校工作站',
            show: false,
            statement: [{
                index: 0,
                name: 'a',
                show: false,
                news: ['n1', 'n2']
            }, {
                index: 0,
                name: 'b',
                show: false,
                news: ['n1', 'n2']
            }]
        }, {
            name: '科联',
            show: false,
            statement: [{
                index: 1,
                name: 'q',
                show: false,
                news: ['n1', 'n2']
            }, {
                index: 1,
                name: 'w',
                show: false,
                news: ['n1', 'n2']
            }]
        }],
        showList: [
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    dealData: function(arr) { //数据处理
        let data = [];

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
        console.log(data);
        return data;
    },
    onLoad: function(e) {
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
    onReady: function(e) {

        let nickName = wx.getStorageSync('nickName')
        console.log(wx.getStorageSync('nickName'))
        this.setData({
            nickName: wx.getStorageSync('nickName'),
            avatarUrl: wx.getStorageSync('avatarUrl'),
            stuid: wx.getStorageSync('stuid'),
            phonenum: wx.getStorageSync('phonenum'),
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
    }
})