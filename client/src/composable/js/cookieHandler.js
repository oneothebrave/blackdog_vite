// 设置cookie
const setCookie = (name, value, expire_day) => {
    const expire_day = expire_day || 1;
    var exp = newDate();
    exp.setTime(exp.getTime() + Days*24*60*60);
    document.cookie = name +"="+ value +";expires="+ exp.toGMTString();
};


// 获取cookie
const getCookie = () => {

};