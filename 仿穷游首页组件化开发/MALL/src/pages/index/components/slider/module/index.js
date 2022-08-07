import BaseSlider from './base.js';
import keyboard from './keyboard.js';
import circle from './circle.js';

// 继承基类
class Slider extends BaseSlider {
  constructor(el, options) {
    super(el, options);

    this.bindEvent();
  }

  bindEvent() {
    keyboard.bindEvent(this);
  }
}

export default Slider;
