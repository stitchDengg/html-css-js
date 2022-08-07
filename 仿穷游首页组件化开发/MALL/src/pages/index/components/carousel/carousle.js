/*
*轮播图特效
*日期：2022/6/28
*author:denghao
*/
// 防止其他的全局变量的污染
(function () {
    var carousel_list = document.getElementById('carousel_list');
    var left_btn = document.getElementById('left-btn');
    var right_btn = document.getElementById('right-btn');
    var circles = document.getElementById('circles');
    var circles_lis = circles.children;
    var banner = document.getElementById('banner');


    // 克隆第一张li
    var clone_li = carousel_list.firstElementChild.cloneNode(true);
    // 上树
    carousel_list.appendChild(clone_li);

    // 当前显示的图片序号从0开始
    var idx = 0;
    // 给右按钮添加监听

    // 设置节流锁
    var lock = true;

    right_btn.onclick = right_btn_handler;
    // 右按钮事件处理函数
    function right_btn_handler() {
        // 函数节流
        if (!lock) {
            return;
        }
        lock = false;
        // 加上过渡属性
        carousel_list.style.transition = 'transform .5s ease 0s';

        idx++;
        // 判断是否是最后一张，如果是最后一张，就瞬间移动回来
        if (idx > 4) {
            setTimeout(() => {
                // 去掉过渡
                carousel_list.style.transition = 'none';
                // 删除transform属性
                carousel_list.style.transform = 'none';
                // 全图的图片序号变为0
                idx = 0;
            }, 500);
        }
        //拉动
        carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';

        //设置小圆点
        setCycles();

        // 把锁打开
        setTimeout(() => {
            lock = true;
        }, 500);
    }

    // 给左按钮添加监听
    left_btn.onclick = function () {
        // 函数节流
        if (!lock) {
            return;
        }
        lock = false;

        // 左按钮很特殊，要先写if语句，而不是idx--;
        if (idx == 0) {
            // 瞬间拉动到最后
            carousel_list.style.transition = 'none';
            // 拉倒最后
            carousel_list.style.transform = 'translateX(' + -16.66 * 5 + '%)';
            setTimeout(() => {
                // 加上过渡
                carousel_list.style.transition = 'transform .5s ease 0s';
                // 动画
                carousel_list.style.transform = 'translateX(' + -16.66 * 4 + '%)';
            }, 0);
            // 改变idx的值
            idx = 4;
        }
        else {
            idx--;
            //拉动
            carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
        }
        //设置小圆点
        setCycles();

        // 把锁打开
        setTimeout(() => {
            lock = true;
        }, 500);
    }

    // 设置小圆点current在谁身上，序号为idx的小圆点才有current的类名，其他的都没有
    function setCycles() {
        // 遍历li
        for (var i = 0; i < circles_lis.length; i++) {
            // 这里%5非常巧妙，01234都是他本身，5会直接变为0
            if (i == idx % 5) {
                circles_lis[i].className = 'current';
            }
            else {
                circles_lis[i].className = '';
            }
        }
    }

    // 事件委托，小圆点的监听
    circles.onclick = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            //console.log(e.target.getAttribute('data-n'));
            var n = Number(e.target.getAttribute('data-n'));
            idx = n;
            carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
            setCycles();
        }
    }

    // 将定时器设置为全局变量
    var timer;
    // 定时器调用右按钮函数
    timer = setInterval(() => {
        right_btn_handler();
    }, 2000);

    // 鼠标进入 轮播暂停
    banner.onmouseenter = function () {
        clearInterval(timer);
    }
    banner.onmouseleave = function () {
        // 设表先关
        clearInterval(timer);
        timer = setInterval(() => {
            right_btn_handler();
        }, 2000);
    }

})()