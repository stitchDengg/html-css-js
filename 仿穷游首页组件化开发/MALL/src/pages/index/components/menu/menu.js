(function () {
    var banner_nav_ul = document.getElementById('banner-nav-ul');
    // 寻找所有的按钮
    var theMenuS = document.querySelectorAll('.banner .center-wrap .banner-nav .menus-box .menu');
    var banner_nav = document.getElementById('banner-nav');
    var bannerLis = document.querySelectorAll('#banner-nav-ul li');
    // 事件委托
    // 必须得使用onmouseover而不是onmouseenter因为onmouseenter不冒泡
    banner_nav_ul.onmouseover = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {

            var t = e.target.getAttribute('data-t');
            // 排他操作去除其他current类
            for (let index = 0; index < bannerLis.length; index++) {
                bannerLis[index].className = '';
            }
            // 当前碰到的这个元素要加current类
            e.target.className = 'current';

            // 寻找匹配的menu
            //var theMenu = document.querySelector('.banner .center-wrap .banner-nav .menus-box .menu[data-t =' + t + ']');

            // 排他操作让所有的盒子都去掉current类名
            for (var i = 0; i < theMenuS.length; i++) {
                if (theMenuS[i].getAttribute('data-t') == e.target.getAttribute('data-t')) {
                    // 匹配的这项加上current类名
                    theMenuS[i].className = 'menu current';
                } else {
                    theMenuS[i].className = 'menu'
                }
            }
        }
    }

    
    // 当鼠标离开大盒子，菜单要关闭
    banner_nav.onmouseleave = function () {
        for (var i = 0; i < theMenuS.length; i++) {
            theMenuS[i].className = 'menu';
            bannerLis[i].className = bannerLis[i].getAttribute('data-t');
        }
    }
})()