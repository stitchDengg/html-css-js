// 添加键盘控制
import { LEFT_KEYCODE, RIGHT_KEYCODE } from './constants.js';

const keyboard = {
  bindEvent(slider) {
    document.addEventListener(
      'keyup',
      ev => {
        if (ev.keyCode === LEFT_KEYCODE) {
          slider.prev();
        } else if (ev.keyCode === RIGHT_KEYCODE) {
          slider.next();
        }
      },
      false
    );
  }
};

export default keyboard;
