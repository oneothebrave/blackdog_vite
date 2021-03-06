//导入占位符图片
// import phImg from "/static/placeholder.png"

const placeholder64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASSURBVBhXY9DU1PwPwlCG5n8AMDYF6T2f80QAAAAASUVORK5CYII="

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
        console.log("mounted")
        // 初始化时展示默认图片
        el.src = placeholder64;
        //将需要加载的图片地址绑定在dom上
        el.data_src = binding.value

        intersectionObserver.observe(el)
    },

    //图片更新触发
    updated(el, binding){
        console.log("updated")
        el.isLoaded = false;
        el.data_src = binding.value
    }
}