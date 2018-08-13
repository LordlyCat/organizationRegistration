//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        overflow: 'hidden',
        cover: 'coverOn',
        switch: true,
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
            phoneNumber: ''
        },
        redRockStatement: {
            all: [0, 1, 2, 3, 4],
            selected: [],
            selectedNow: [0],
            init: true
        }
    },
    register: function(e) {
        this.setData({
            cover: 'coverOn',
            switch: false
        })
    },
    submitInformation: function() {

        let flag = false;
        let obj = this.data.information;
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        Object.keys(obj).forEach(function(key) {
            if (key !== 'phoneNumber') {
                if (obj[key].length === 0 || re.test(obj[key])) {
                    flag = true;
                    return;
                }
            }

            console.log(key, obj[key]);
        })
        if (flag) {
            wx.showModal({
                title: '绑定失败',
                content: '必填项内容不能为空',
                showCancel: false
            })
        } else {
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
        }
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
            case "phoneNumber":
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
    },
    quitSelect: function(e) {
        this.setData({
            cover: 'coverOff',
            switch: false
        })
    },
    chooseStatement: function(e) {

        this.setData({
            redRockStatement: { ...this.data.redRockStatement,
                selectedNow: e.detail.value

            }
        })

    },
    checkSelected: function(e) {

        let oldSelected = this.data.redRockStatement.selected;
        let newSelected = newSelected = new Set(oldSelected);
        let selectedNow = this.data.redRockStatement.selectedNow;

        newSelected.add(this.data.redRockStatement.selectedNow[0]);

        this.setData({
            redRockStatement: {
                ...this.data.redRockStatement,
                selected: newSelected
            }
        })
    },
    ch: function(e) {
        console.log(this.data.redRockStatement.selected)
    }
})



// End