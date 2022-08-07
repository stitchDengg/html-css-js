(function () {
    //返回顶部按钮
    var backtotop = document.getElementById('backtotop');
    var timer;
    // 实现返回顶部动画
    backtotop.onclick = function () {
        // 防止定时器冲突
        clearInterval(timer);
        timer = setInterval(() => {
            document.documentElement.scrollTop -= 100;
            if(document.documentElement.scrollTop <=  0){
                clearInterval(timer);
            }
        }, 20);

        // 监听页面的滚动
        window.onscroll = function (){
            // 得到卷动值
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            
            // 如果页面没有滚动,返回顶部按钮就隐藏
            if(scrollTop == 0){
                backtotop.style.display = 'none';
            }else{
                backtotop.style.display = 'block';
            }
        }
    }
})()