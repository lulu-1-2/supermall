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