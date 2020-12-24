//防抖函数
export function debounce(func, delay) {
  let timer = null;
  //...args,可以传入多个参数
  return function (...args) {
    //clearTimeout可以用来关闭一个延时调用
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

//将时间戳转换成格式化字符串
export function formatDate(date, fmt) {
  //1.获取年份
  //test()函数用来检查字符串是否符合正则表达式的规则
  if (/(y+)/.test(fmt)) {
    //RegExp.$1指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      //[]里面可以传入变量，这样变量是多少就会读取哪一个属性
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));//12/24
    }
  }
  return fmt;
}

function padLeftZero(str){
return ('00' + str).substr(str.length);
}



