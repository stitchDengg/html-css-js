// 添加小圆点控制
const circle = {
    bindEvent(slider) {
        // 事件委托，小圆点的监听
        slider.circle_ol.addEvenListener(
            'click',
            (e) => {
                if (e.target.tagName.toLowerCase() == 'li') {
                    // 得到li身上的data-n属性，就是n
                    let n = Number(e.target.getAttribute('data-n'));
                    // 改变idx
                    slider.currIndex = n;
                    // 拉动
                    slider.moveWithAnimation(slider.getDistance());
                    // 调用改变小圆点函数
                    slider.setCircles();
                }
            }
        )
    }
}

export default circle;
