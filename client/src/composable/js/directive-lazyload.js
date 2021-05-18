//导入占位符图片
import phImg from "/static/placeholder.png"

//创建一个监听器
let intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting || entry.intersectionRatio > 0){
            //当被监听元素到达临界值且未加载图片时触发
            //先判断元素是否被加载，只有当元素未被加载时才会执行&&后面的代码
            !entry.target.isLoaded && loadImage(entry.target, entry.target.data_src)
            // 当前图片加载完之后需要去掉监听
            intersectionObserver.unobserve(entry.target)
        }
    })
});

function loadImage(el, imgSrc){
    //创建一个<img> dom 元素(同时也是一个对象)
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
        el.src = imgSrc;
        el.isLoaded = true;
    }
};

export default{
    mounted(el, binding){
        // 初始化时展示默认图片
        el.src = phImg;
        //将需要加载的图片地址绑定在dom上
        el.data_src = binding.value

        intersectionObserver.observe(el)
    },

    //图片更新触发
    updated(el, binding){
        el.isLoaded = false;
        el.data_src = binding.value
    }
}