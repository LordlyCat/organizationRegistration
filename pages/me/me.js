const app = getApp()

Page({
    data: {
        src: {
            src_1: "../../img/icon1.png",
            src_2: "../../img/icon2.png",
            src_3: "../../img/icon3_on.png"
        },
        moreClassName1: 'more',
        more1: '../../img/more.png',
        moreClassName2: 'pick',
        more2: '../../img/pick.png',
        orgnazition: [{
            name: '红岩网校工作站',
            show: false,
            statement: [{
                name: 'a',
                show: false
            }, {
                name: 'b',
                show: false
            }]
        }, {
            name: '科联',
            show: false,
            statement: [{
                name: 'q',
                show: false
            }, {
                name: 'w',
                show: false
            }]
        }],
        showList: [
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    // onReady: function(e) {
    //     for (let i = 0; i < this.data.orgnazition.length; i++) {
    //         let arr = [];
    //         arr.push(0);
    //         for (let j = 0; j < this.data.orgnazition[i].statement.length; j++) {
    //             arr.push(0);
    //             console.log(1)
    //         }
    //         this.data.showList.push(arr);
    //     }
    //     console.log(this.data.showList.length)
    // },
    showMore: function(e) {
        console.log(e.currentTarget.dataset.name, e.currentTarget.dataset.index);
        let index = parseInt(e.currentTarget.dataset.index, 10);
        let arr = this.data.orgnazition;
        console.log(arr[index].show);
        if (arr[index].show) {
            arr[index].show = false;
        } else {
            arr[index].show = true;
        }

        this.setData({
            orgnazition: arr
        });
    }
})