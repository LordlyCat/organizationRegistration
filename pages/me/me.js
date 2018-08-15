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