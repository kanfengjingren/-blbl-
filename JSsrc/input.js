export default {

    initInput(){
    const searchContainer = document.querySelector('.search-test');
    const searchDiv = document.querySelector('.blbl-topbar-search');
    const searchInput = document.querySelector('.blbl-topbar-search input');
    const exhibitionArea = document.querySelector('.Exhibition-Area');
    searchDiv.addEventListener('mouseenter', () => {
        searchDiv.style.backgroundColor = 'white';
    });

    searchInput.addEventListener('focus', () => {

        searchInput.style.backgroundColor = '#E3E5E7';
        searchDiv.style.backgroundColor = 'white';
        searchDiv.style.borderRadius = '8px 8px 0 0';
        searchDiv.style.border = '0';
        exhibitionArea.style.display = 'block';
        exhibitionArea.style.border = '0';
    });


    //searchInput是focus的状态的时候，exhibitionArea要是block
    //searchInput不是focus状态的时候，exhibitionArea要是none
    //也就是整个整体要是一个类似focus状态，即focus在input上的时候，exhibition会冒出来
    //而现在在里面点击，即使input退出focus状态，而退出的原因是点击了整个内容里面的一部分，exhibition不会消失
    //点击了整体之外的东西才会消失

    //现在有了，全局检测，我测还有这种东西
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            exhibitionArea.style.display = 'none';
            searchInput.style.backgroundColor = '#F1F2F3';
            searchDiv.style.backgroundColor = '#F1F2F3';

            searchDiv.style.borderRadius = '8px';
        }
    });


    //输入东西之后，发送ajax请求然后出入数据
    //服务端存储了许多数据，搜索字符，发送含有相同字符的字符串信息过来
    //检测输入东西，这个靠啥监听？keydown
    searchInput.addEventListener('keyup', () => {
        //每次键盘抬起来都检查一次input的值，然后发送到ajax，让服务器发送对应数据回来
        console.log('这一次的值' + searchInput.value);
        //获取到值 searchInput.value
        //发送到服务端
        //post到服务端
        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://127.0.0.1:8000/search', true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        const testText = searchInput.value

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let recive = JSON.parse(xhr.response);

                    let str = '';
                    for (let i = 0; i < recive.length; i++) {
                        str += `<a href="">
                                <p class="hover:bg-gray-400 h-[40px] text-black">${recive[i]}</p>
                            </a>`
                    }
                    exhibitionArea.innerHTML = str;
                }
            }
        }
        xhr.send(testText);


    });
}
}
