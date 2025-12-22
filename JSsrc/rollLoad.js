export default {
    initRollLoad() {
        const grid = document.querySelector('.blbl-main');
        const game = document.querySelector('.game');
        const gamehover = document.querySelector('.gamehover');
        const topbar = document.querySelector('.blbl-topbar');
        const miniLogo = document.querySelector('.mini-header__logo');
        const headChannel = document.querySelector('.head_channel');

        let bodyheight = document.documentElement.scrollHeight;
        let n = document.documentElement.scrollTop;
        let viewportHeight = window.innerHeight;


        console.log(bodyheight);
        console.log(viewportHeight);


        //还有这种操作的喔，要先加载完

        window.addEventListener('load', startLoad);




        //改变定位
        window.addEventListener('scroll', () => {

            //获取一下当前body的总长，如果接近了，就ajax调用
            bodyheight = document.documentElement.scrollHeight;
            console.log('我是scrollHeight' + bodyheight);

            //scrollTop:页面被卷走了多少
            n = document.documentElement.scrollTop;
            console.log('我是scrollTop' + n);

            viewportHeight = window.innerHeight;
            console.log(viewportHeight);


            if (n >= 81) {
                //把定位改成fixed定位
                topbar.style.position = 'fixed';
                topbar.style.backgroundColor = 'white';
                topbar.style.color = 'black';

                miniLogo.style.display = 'block';

            } else {
                topbar.style.position = 'relative';
                topbar.style.backgroundColor = '';
                topbar.style.color = 'white';
                miniLogo.style.display = 'none';
            }

            if (n > 225) {
                headChannel.style.display = 'block';
                //改为fixed定位之后因为margin是auto所以贴到开头了
            } else {
                headChannel.style.display = 'none';
            }

            const chazhi = bodyheight - n - viewportHeight;
            //这里要减去你视口的高度嘛，这样才对


            if (chazhi < 100) {

                loading();
            }
        })


        function loading() {
            //1、获取ajax对象
            const xhr = new XMLHttpRequest();
            //2、初始化，设置请求方法和url
            xhr.open('GET', 'http://127.0.0.1:8000/server');
            //3、send发送
            xhr.send();
            //4、判断状态处理参数回应
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        //最后改成滚动刷新就行了，应该。。。
                        //处理回应
                        // ajaxTest.innerHTML = xhr.response;
                        //这个传过来是JSON字符串，要先转换成数组JSON.parse
                        let data = JSON.parse(xhr.response);
                        console.log(data);

                        for (let j = 0; j < 5; j++) {
                            const divTest = document.createElement('div');
                            divTest.classList.add('blbl-vedio');
                            divTest.innerHTML = `<a href="./video.html?videoId=${data[j].videoId}">
                                    <img src="${data[j].imgUrl}" class="rounded-md"> </a>
                                    <div class="vediohead">
                                        <a href="./video.html?videoId=${data[j].videoId}">
                                            <h3>${data[j].head}</h3>
                                        </a>
                                        <div style="display: none;">展开</div>
                                    </div>
                                    <span class="text-[#61666D]">${data[j].upName}</span>`;
                            //再把这个插入

                            grid.append(divTest);
                        }
                        bodyheight = document.documentElement.scrollHeight;
                        // n = document.documentElement.scrollTop;
                        viewportHeight = window.innerHeight;
                        console.log(viewportHeight);

                    }
                }
            }
        }

        // let isLoading = false;
        function startLoad() {

            console.log('执行成功');

            console.log('bodyheight' + bodyheight);
            console.log('viewportHeight' + viewportHeight);

            loading();
            //真奇怪啊，为啥这个会相等的啊。。
            if (bodyheight < viewportHeight * 1.1) {
                setTimeout(startLoad, 200);
            } else {
                return;
            }
        }
    }
}