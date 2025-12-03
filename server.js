//1.引入express
const express = require('express');
//2、创建应用对象
const app = express();

//将视频封装成一个对象数组，然后把对象JSON化，最后传JSON


const videoTest = {
    url : `./img/多罗西新书.jpg`,
    head:'【新书首发】下班后签2000本书是什么体验？|《烦恼退散》',
    upName:'up多罗西123'
};
const data = JSON.stringify(videoTest);
//3、创建路由规则
app.get('/server', (request, response) => {

    console.log('收到请求');
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(data);
});
//4、监听窗口启动服务
app.listen(8000, () => {
    console.log("服务器已经启动,8000端口监听中...");

})