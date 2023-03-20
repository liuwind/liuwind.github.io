// 封装一个获取计算以后样式属性值的方法
function getStyle(dom, attr) {
    return window.getComputedStyle(dom)[attr];
}


// 版本三: 封装缓动框架(添加回调函数)
/**
 * 封装元素js缓慢动画框架
 * 参数1 {object} dom  要做动画的dom对象
 * 参数2 {object} obj 要做动画的一对或者多对CSS属性名和目标值 组成的对象
 * 参数3 可选参数 {function} callback  动画完成以后,要调用的函数  回调函数就是满足一定条件才调用的函数
 */

function animate(dom, obj, callback) {
    // 清除之前的定时器
    clearInterval(dom.intervalId);

    // 开启定时器
    dom.intervalId = setInterval(function () {
        // 在定时器内部定义一个变量, 保存是否所有CSS属性都达到了目标值
        var flag = true; // 假设所有属性已经达到了目标

        // for...in遍历obj对象    attr就是css属性名
        for (var attr in obj) {
            // opacity属性特殊处理
            if (attr == "opacity") {
                // 获取目标值
                var target = obj[attr] * 100;

                // 获取当前dom的attr对应的属性值
                var curVal = parseFloat(getStyle(dom, attr)) * 100;

                // 判断是否达到目标值
                if (curVal != target) { // 如果没有达到
                    // 修改flag变量的值
                    flag = false;
                }
                // 缓慢动画的意思就是速度由快变慢, 运动速度越来越慢
                // 缓慢动画公式:  速度 = ( 目标值 - 当前值 ) / 10;
                var speed = (target - curVal) / 10;
                // 因为速度有可能得到小数, 小数会导致我们无法达到目标值, 所以需要对速度进行取整
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                // 设置dom对象对应的attr属性值
                dom.style[attr] = (curVal + speed) / 100;
            } else if (attr == "z-index" || attr == "zIndex") {
                //  z-index或者zIndex属性特殊处理
                dom.style[attr] = obj[attr];
            } else {
                // 获取目标值
                var target = obj[attr];

                // 获取当前dom的attr对应的属性值
                var curVal = parseFloat(getStyle(dom, attr));


                // 判断是否达到目标值
                if (curVal != target) { // 如果没有达到
                    // 修改flag变量的值
                    flag = false;
                }

                // 缓慢动画的意思就是速度由快变慢, 运动速度越来越慢
                // 缓慢动画公式:  速度 = ( 目标值 - 当前值 ) / 10;
                var speed = (target - curVal) / 10;
                // 因为速度有可能得到小数, 小数会导致我们无法达到目标值, 所以需要对速度进行取整
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                // 设置dom对象对应的attr属性值
                dom.style[attr] = curVal + speed + "px";
            }
        }

        // for...in结束,就表示所有属性都遍历完毕了
        if (flag) { // 判断flag的值
            // 清除定时器
            clearInterval(dom.intervalId);
            // 动画完成了,所以我们可以调用回调函数, 前提是存在回调函数
            if (callback !== undefined && typeof callback === "function") {
                callback();
            }
        }
    }, 15);
}