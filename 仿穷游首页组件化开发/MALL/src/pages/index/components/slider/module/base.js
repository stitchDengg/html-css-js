import { ELEMENT_NODE_TYPE, SLIDER_ANIMATION_CLASS_NAME } from './constants';
import DEFAULTS from './defaults.js';
class BaseSlider {
  constructor(el, options) {
    if (el.nodeType !== ELEMENT_NODE_TYPE) {
      throw new Error('实例化的时候，请传入dom元素');
    }
    // 实际参数
    this.options = {
      ...DEFAULTS,
      ...options
    };
    const sliderEl = el;
    const sliderContentEl = sliderEl.querySelector('.slider-content');
    const sliderItemEls = sliderEl.querySelectorAll('.slider-item');
    const circles = sliderEl.querySelector('.circles');
    const circles_lis = circles.children;

    // 添加到this上，在方法中能够用到
    this.sliderEl = sliderEl;
    this.sliderContentEl = sliderContentEl;
    this.sliderItemEls = sliderItemEls;
    this.circles_lis = circles_lis;
    this.circles = circles;

    // 幻灯片的最大最小索引
    this.minIndex = 0;
    this.maxIndex = sliderItemEls.length - 1;

    // 获取矫正后的索引
    this.currentIndex = this.getCorrectedIndex(this.options.initialIndex);

    //每个slider-item的宽度(每次移动的距离)
    this.itemWidth = sliderItemEls[0].offsetWidth;

    // 初始化
    this.init();
  }

  init() {
    // 为每一个slideritem设置宽度
    this.setItemsWidth();

    // 为sliderContrent设置宽度
    this.setContentWidth();

    //切换到初始索引值initialIndex
    this.move(this.getDistance());

    // 开启动画
    if (this.options.animation) {
      this.openAnimation();
    }

    // 自动切换
    if (this.options.autoplay) {
      this.autoplay();
    }
  }


  // 自动切换
  autoplay() {
    const { autoplay } = this.options;
    if (autoplay <= 0) return;
    // 用计时器先停计时器
    this.pause();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, autoplay);
  }

  // 暂停自动切换
  pause() {
    // 清除定时器
    clearInterval(this.autoplayTimer);
  }

  //!切换到index索引对应的幻灯片
  to(index) {
    // 先矫正索引
    index = this.getCorrectedIndex(index);

    // 如果传过来的索引和当前索引相等
    if (this.currentIndex === index) return;
    // 更新索引值
    this.currentIndex = index;
    // 得到要移动的距离
    const distance = this.getDistance();
    if (this.options.animation) {
      this.moveWithAnimation(distance);
    } else {
      this.move(distance);
    }
  }

  // 切换上一张
  prev() {
    this.to(this.currentIndex - 1);
  }

  // 切换下一张
  next() {
    this.to(this.currentIndex + 1);
  }


  // 不带动画的移动
  move(distance) {
    this.sliderContentEl.style.transform = `translate3d(${distance}px,0px,0px)`;
    this.setCycles();
  }

  // 带动画的移动
  moveWithAnimation(distance) {
    // 开启动画
    this.setAnimationSpeed();
    // 移动
    this.move(distance);
    // 过渡过程完成以后触发此事件
    this.sliderContentEl.addEventListener('transitioned', () => {
      // 关掉动画
      this.closeAnimation();
    }, false);
  }

  // 获取要移动的距离
  getDistance(index = this.currentIndex) {
    // 返回移动的距离 是负值
    return -this.itemWidth * index;
  }


  // 开启动画
  openAnimation() {
    // 给sliderContentEl添加样式
    this.sliderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME);
  }

  //设置切换动画的速度
  setAnimationSpeed(speed = this.options.speed) {
    this.sliderContentEl.style.transitionDuration = `${speed}ms`;
  }

  // 关闭动画
  closeAnimation() {
    this.setAnimationSpeed(0);
  }


  //为每一个slideritem设置宽度
  setItemsWidth() {
    for (const iterator of this.sliderItemEls) {
      iterator.style.width = `${this.itemWidth}px`;
    }
  };

  //为sliderContrent设置宽度
  setContentWidth() {
    this.sliderContentEl.style.width = `${this.itemWidth * this.sliderItemEls.length}px`
  }

  //获取矫正后的索引值
  getCorrectedIndex(index) {
    if (index < this.minIndex) return this.maxIndex;
    if (index > this.maxIndex) return this.minIndex;

    return index;
  }

  //设置小圆点
  setCycles() {
    const circles_lis = this.circles_lis;
    for(let i = 0; i < circles_lis.length; i++){
      if(i === this.currentIndex){
        circles_lis[i].classList.add('current')
      }else{
        circles_lis[i].classList.remove('current');
      }
    }
  }
}

export default BaseSlider;