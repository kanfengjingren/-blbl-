export default {
    initRoll(){
        //点击roll-button，上面展示区的要变化
        const rollButton = document.querySelector('.roll-button');
        const test = document.querySelectorAll('.blbl-main .test');
        rollButton.addEventListener('click', () => {
            //发送请求，获取数据，改变innerHTML
            console.log(test.length);//6个

            const xhr = new XMLHttpRequest();
            //初始化，设置方法和url
            xhr.open('GET', 'http://127.0.0.1:8000/part-refresh');
            //3、发送
            xhr.send();
            //4、判断返回状态
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {

                        let data = JSON.parse(xhr.response);

                        for (let j = 0; j < 6; j++) {

                            test[j].innerHTML = `
                            <a href="./video.html?videoId=${data[j].videoId}" target="_blank">
                                <img src="${data[j].imgUrl}" class="rounded-md">
                            </a>

                            <div>
                            <a href="./video.html?videoId=${data[j].videoId}" target="_blank">
                            <h3 class="h-[42px]">${data[j].head}</h3>
                            </a>
                            <div style="display: none;">展开</div>
                            </div>

                            <span class="text-[#61666D]">up${data[j].upName}</span>
                            `;

                        }

                    }
                }
            }
        });


        const toTop = document.querySelector('.toTop');
        const totalRefresh = document.querySelector('.total-refresh');
        const more = document.querySelector('.more');
        toTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        window.addEventListener('scroll', () => {
            let n = document.documentElement.scrollTop;
            if (n > 700) {
                toTop.style.display = "block";
                totalRefresh.style.display = 'block';
                more.style.display = 'block';
            } else {
                toTop.style.display = "none";
                totalRefresh.style.display = "none";
                more.style.display = "none";

            }
        });
    }
}