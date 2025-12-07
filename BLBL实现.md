1、实现b站，而且数据要用json，模拟ajax调用。
2、这个调用应该是在主页向下滑动加载出来新的东西之后需要用ajax来发送数据
3、然后观察主页，明显是有媒体查询然后改变布局的
4、先用html+css搞定基本布局


### 引入网站图标
使用这样一行类型是icon的链接，然后图片地址写成对应的地址
`<link rel="icon" href="./img/blbl.ico">`
### 用express去建立一个本地的服务器
使用`npm i express`安装好express框架
构建出express的基本结构 
```
//1、引入express
const express = require('express');
//创建应用对象
const app = express();
//3、创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
app.get('/', (request, response) => {

    response.send('hello Ajax');
});
//4、监听端口启动服务
app.listen(8000, () => {
    console.log("服务器已经启动,8000端口监听中...");

})
```
### 使用nodemon启动服务器，实时改变服务器的状态和变化
`npm install -g nodemon`安装
`nodemon server.js`启动服务器端
启用之后，服务器会自动刷新更改

### 使用tailwindcss4
构建流程：
![tailwindcss安装](/笔记img/tailwindcss.png "tailwindcss安装")
* 注意html中引入的是output.css

### git提交和同步的准备
使用vs自带的git工具，创建库之后，提交。注意的是我在github上已经创建了库，所以治理使用远程去选取库而不是创建一个新的库
![添加远程存储库](/笔记img/添加远程存储库.png "添加远程存储库")

## html+css
总体的html分为三部分：头部、分类区、主体区
![blbl](/笔记img/blbl.png)
### 1.头部也分为左中右三个部分，左边和右边的功能类似，中间部分则是搜索框。同时整个头部在滚动到一定范围之后需要作为fixed定位。左右两边分区需要使用定位来实现一些下拉框效果。中间的搜索框，我的想法是简单的把输入的数据发送到服务端，让服务端经过一些处理之后，再发送回来
服务端：
```
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
```
### 2.分类区
![分类区](/笔记img/分类区.png)
第一次使用grid布局，感觉还不错，不过这里是写在原生css里卖弄的，后面我再改到tailwindcss里面

### 3.主内容
![主内容](/笔记img/主内容.png)
使用grid布局，然后轮播图是跨行跨列
下方的主要内容，我的想法是，页面滚动到一定位置再发送ajax请求JSON数据转换成对象再实现一个加载，这个好像就是懒加载？

# 注意
1、在JavaScript中直接操作style属性时，属性名需要使用驼峰命名法，而不是CSS中的短横线命名法。