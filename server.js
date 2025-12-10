//1.引入express
const express = require('express');
//2、创建应用对象
const app = express();

//将视频封装成一个对象数组，然后把对象JSON化，最后传JSON

const vedioList = [
    {
        url: `https://www.bilibili.com/video/BV1PBCMBrE28/?spm_id_from=333.1387.homepage.video_card.click&vd_source=840dfaa615de778652d5bfe3f31666aa`,
        imgUrl: `./img/多罗西新书.jpg`,
        head: '【新书首发】下班后签2000本书是什么体验？|《烦恼退散》',
        upName: 'up多罗西123'
    },
    {
        url: `https://www.bilibili.com/video/BV1mb4y1z7jG/?spm_id_from=333.1387.favlist.content.click`,
        imgUrl: `./img/TheWall.jpg`,
        head: '《迷墙》-平克弗洛伊德 全专整柜附字幕',
        upName: 'NikateKiwi'
    },
    {
        url: `https://www.bilibili.com/video/BV1mb4y1z7jG/?spm_id_from=333.1387.favlist.content.click`,
        imgUrl: `./img/American football.jpg`,
        head: '【HiRes无损音乐】 American Football（美国足球）',
        upName: '看风景人'
    },
    {
        url: `https://www.bilibili.com/video/BV1nL4y147kH/?spm_id_from=333.1387.favlist.content.click&vd_source=840dfaa615de778652d5bfe3f31666aa`,
        imgUrl: `./img/月之暗面.jpg`,
        head: '5.1 杜比全景声 Pink Floyd - The Dark Side of the Moon',
        upName: '看风景人'
    },
    {
        url: `https://www.bilibili.com/video/BV1P8R8YTELb/?spm_id_from=333.1387.favlist.content.click`,
        imgUrl: `./img/black in back.jpg`,
        head: 'AC/DC交流/直流《Back In Black》专辑',
        upName: '看风景人'
    }



];

app.get('/part-refresh',(request,response)=>{
    //随机选取六个对象组成新的对象数组，然后JSON化返回
    let vedioTest = [];
    for (let i = 0; i < 6; i++) {
        let randomInRange = Math.floor(Math.random() * (vedioList.length));
        console.log(randomInRange);

        vedioTest.push(vedioList[randomInRange]);
    }

    //每个对象都应该有个状态？被选到了就要改成另一种，然后刷新的时候发送一个请求，服务端再全部重置状态

    const data = JSON.stringify(vedioTest);
    console.log('收到请求');
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(data);
})



//3、创建路由规则
app.get('/server', (request, response) => {
    //随机选取五个对象组成新的对象数组，然后JSON化返回
    let vedioTest = [];
    for (let i = 0; i < 5; i++) {
        let randomInRange = Math.floor(Math.random() * (vedioList.length));
        console.log(randomInRange);

        vedioTest.push(vedioList[randomInRange]);
    }

    //每个对象都应该有个状态？被选到了就要改成另一种，然后刷新的时候发送一个请求，服务端再全部重置状态

    const data = JSON.stringify(vedioTest);
    console.log('收到请求');
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(data);
});

const textArr = ['a',
    'A',
    'ab',
    'abc',
    'abcd',
    'abcde',
    'abcdef',
    'abcdefg',
    'abcdefgh',
    'abcdefghi',
    'abcdefghij',
    '2026年省考难度',
    '梅西迈阿密超燃夺冠记录',
    '牧神记平叛篇正式开启',
    '萨拉赫炮轰利物浦',
    '揭开西夏陵神秘面纱',
    '情久 vs TTG 挑战者杯',
    '辽宁舰正常训练遭日本飞机滋扰',
    '美国战略布局有何转变',
    '动物城薪资和体型有何关联',
    '小航母076究竟有多强',
    'pink Floyd',
    '小木曾雪菜',
    '五更琉璃',
    'American football',
    '【新书首发】下班后签2000本书是什么体验？|《烦恼退散》',
    '《迷墙》-平克弗洛伊德 全专整柜附字幕',
    '5.1 杜比全景声 Pink Floyd - The Dark Side of the Moon',
    'AC/DC交流/直流《Back In Black》专辑',
    '小满zs',
    '万能青年旅店',
    '冀西南林路行',
    'IG官宣TheShy暂离赛场',
    '2026总台春晚主题主标识发布',
    '中国贸易顺差破万亿美元',
    'NiKo更新香港Vlog',
    '为何冰岛这么冷还会有蚊子',
    '左手说Viper和Xun加入很开心',
    'Links李现西藏徒步',
    '沈逸苑举正对谈两岸未来',
    '2025年还剩3周',
];

app.use(express.text());
//创建一个处理数据的路由规则
app.post('/search', (req, res) => {
    console.log('收到搜索请求');
    res.setHeader('Access-Control-Allow-Origin', '*');
    //用req来读取一个接受过来的信息
    console.log(req.body);
    //发送的纯字符串请求



    const textData = JSON.stringify(chooseArr(req.body, textArr));


    //返回什么数据？10条有关信息，把req.body的每个字符拆开来，去textArr里面寻找
    res.send(textData);
})

function chooseArr(str, arr) {
    const dataSet = new Set();
    let charArr = str.split('');

    for (let index = 0; index < charArr.length; index++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].includes(charArr[index])) {
                dataSet.add(arr[j]);
            }

        }

    }
    const dataArr = Array.from(dataSet)



    return dataArr;
}








//4、监听窗口启动服务
app.listen(8000, () => {
    console.log("服务器已经启动,8000端口监听中...");

})