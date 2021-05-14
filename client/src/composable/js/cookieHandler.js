// 设置cookie
export const setCookie = (name, value, expire_day) => {
    var expire_day = expire_day || 1;
    const exp = new Date();
    exp.setTime(exp.getTime() + expire_day * 24 * 60 * 60 * 1000);
    document.cookie = name +"="+ value +";expires="+ exp.toGMTString();
};


// 获取cookie
export const getCookie = (name) => {
  let arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr = document.cookie.match(reg))
      return unescape(arr[2]);
  else
      return null;
};

//删除cookies
export const delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval != null)
        document.cookie = name + "=" + cval + ";expires="+exp.toGMTString();
}