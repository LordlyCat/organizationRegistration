//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        overflow: 'hidden',
        cover: 'coverOn',
        src: {
            src_1: "../../img/icon1.png",
            src_2: "../../img/icon2_on.png",
            src_3: "../../img/icon3.png"
        },
        orgnazition: [{
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }, {
            name: "红岩网校工作站",
            dec: "在重庆邮电大学，有一个神秘的组织———红岩网校工作站，那里的人经常抱着电脑行色匆匆的游走在校园。"
        }],
        information: {
            username: '',
            studentID: '',
            phonenumber: ''
        }
    },
    register: function(e) {
        console.log(1);
    },
    submitInformation: function() {
        this.setData({
            overflow: 'visible',
            cover: 'coverOff'
        });
        console.log(this.data.information)
    },
    getInput: function(e) {

        switch (e.target.id) {
            case "username":
                this.setData({
                    information: {
                        ...this.data.information,
                        username: e.detail.value
                    }
                })
                break;
            case "studentID":
                this.setData({
                    information: {
                        ...this.data.information,
                        studentID: e.detail.value
                    }
                })
                break;
            case "phonenumber":
                this.setData({
                    information: {
                        ...this.data.information,
                        phonenumber: e.detail.value
                    }
                })
                break;
            default:
                console.log(false);
                break;
        }
        //console.log(this.data.information)
    }
    // rejectMove: function(e) {
    //     console.log(123);
    //     e.preventDefault && e.preventDefault();
    //     e.returnValue = false;
    //     e.stopPropagation && e.stopPropagation();
    //     // console.log('00')
    //     return false;
    // }
})


// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })