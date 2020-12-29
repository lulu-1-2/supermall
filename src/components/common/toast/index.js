import Toast from './Toast'
const obj = {}
//install函数执行的时候默认会传过去一个vue参数
obj.install = function (Vue) {
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor();
    //3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    //4.向一个父节点中添加新的子节点元素
    //所有的组件都有一个属性$el:用于获取组件中的元素
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = toast;
}


export default obj



