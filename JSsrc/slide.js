
function initLunbo() {
    let i = 1;

    let timeId;
    let timer = null;
    const lunbo = document.querySelector('.lunbo');
    const lunboText = document.querySelector('.lunbo h3');
    const width = lunbo.clientWidth;
    const allDot = document.querySelectorAll('.dot-container li');
    const dotContainer = document.querySelector('.dot-container');
    const allImg = document.querySelector('.image-container');
    //事先设置位置
    allImg.style.transform = `translate(${-width}px)`;
    const btns = document.querySelectorAll('.button-container button');
    const text = ['上天竺法喜讲寺', '缎带', '鸟', '墙', '大雄宝殿'];



    lunbo.addEventListener('mouseenter', () => {
        clearInterval(timeId)
    });
    lunbo.addEventListener('mouseleave', () => {
        timeId = setInterval(nextImg, 3000);
    });
    const nextImg = () => {
        i++;
        console.log(i);
        //  0 1 2 3 4 5
        //  1 2 3 4 5 6 7
        //5 1 2 3 4 5 1
        if (i < 6) {
            imgTrans(i);
        } else {
            //先让它展现第六张
            allImg.style.transform = `translate(${-(i * width)}px)`;
            lunboText.innerHTML = text[0];
            clearActive();
            allDot[0].classList.add('dot-active');
            //过渡动画结束之后，立马关闭动画效果跳转到第一张
            allImg.addEventListener('transitionend', () => {
                //'transitionend'
                //先关闭动画，再跳转
                allImg.style.transition = 'none';
                i = 1;
                allImg.style.transform = `translate(${-i * width}px)`;
            }, { once: true });//用来判断动画是否结束

        }
        allImg.style.transition = 'all .8s';
    }

    const preImg = () => {
        i--;
        if (i > 0) {
            imgTrans(i);
        } else {
            allImg.style.transform = `translate(${-(i * width)}px)`;
            lunboText.innerHTML = text[4];
            clearActive();
            allDot[4].classList.add('dot-active');
            allImg, addEventListener('transitionend', () => {
                allImg.style.transition = 'none';
                i = 5;
                allImg.style.transform = `translate(${-(i * width)}px)`;
            }, { once: true });
        }
        allImg.style.transition = 'all .8s';
    }
    timeId = setInterval(nextImg, 3000);

    const clearActive = () => {
        allDot.forEach((dot) => {
            dot.classList.remove('dot-active');
        });
    }
    //直接抽成一个函数
    //节流，我不想让短时键内点击多次
    const throttle = (fn, t) => {

        return function () {
            if (!timer) {
                fn();
                timer = setTimeout(() => {
                    timer = null;
                }, t)
            }
        }
        //这样实际的timer，不会每次点击都是不同的timer而导致每次都能执行吗
    }//函数提升是怎么一回事
    //箭头函数没有函数提升。。。
    const imgTrans = (index) => {
        allImg.style.transform = `translate(${-(index * width)}px)`;
        lunboText.innerHTML = text[index - 1];
        clearActive();
        allDot[index - 1].classList.add('dot-active');

        const color = getBottomAverageColor(allImg.children[i]);
        lunbo.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }
    btns[0].addEventListener('click', throttle(preImg, 800));
    btns[1].addEventListener('click', throttle(nextImg, 800));




    //点击下方小点  e.target.classList.contains('dot')
    dotContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            i = Number(e.target.dataset.index);
            imgTrans(i);
        }
    });

    function getBottomAverageColor(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        // 取底部20%的区域
        const bottomHeight = Math.floor(canvas.height * 0.2);
        const imageData = ctx.getImageData(
            0,
            canvas.height - bottomHeight,
            canvas.width,
            bottomHeight
        );

        const data = imageData.data;
        let r = 0, g = 0, b = 0, count = 0;

        // 采样计算平均值
        for (let i = 0; i < data.length; i += 16) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }

        return [
            Math.floor(r / count),
            Math.floor(g / count),
            Math.floor(b / count)
        ];
    }
}
export {initLunbo}


