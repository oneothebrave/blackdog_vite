// 设置cookie
const setCookie = (name, value, expire_day) => {
    const expire_day = expire_day || 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + expire_day * 24 * 60 * 60 * 1000);
    document.cookie = name +"="+ value +";expires="+ exp.toGMTString();
};


// 获取cookie
const getCookie = (name) => {
    const name = name + "=";
    const ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
};