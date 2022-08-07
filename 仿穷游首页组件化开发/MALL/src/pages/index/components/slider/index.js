import './slider.css';
import './btn.css';
import Slider from './module'
import { getData } from 'api/getData';

const slider = new Slider(document.querySelector('.slider'),{
    initialIndex:0,
    animation: true,
    // 切换速度，单位 ms
    speed: 300,
    // 自动切换，单位 ms
    autoplay: 0
});

const leftBtnEl = document.getElementById('left-btn');
const rightBtnEl = document.getElementById('right-btn');
const bannerEl = document.getElementById('banner');


//按钮事件
leftBtnEl.addEventListener('click',() => {
    slider.prev();
},false);

rightBtnEl.onclick = () => {
    slider.next();
}

// 鼠标滑上去停止自动切换
bannerEl.onmouseenter = ()=> {
    slider.pause();
}

// 鼠标移出继续自动切换
bannerEl.onmouseleave = () => {
    slider.autoplay();
}

