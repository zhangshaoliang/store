# store 
##### 在微信小程序里实现整体的状态管理，组件间通信，数据共享，数据实时渲染等

#### 1.引入
clone 仓库代码后，copy项目中plugins文件夹下面的store文件夹，到自己项目中。在根目录下创建store.js（可任意位置，任意命名，后面引入统一即可）。在store.js中创建实例对象，传入state:{} 和mutations:{}，在小程序app.js中import引入刚才创建的store.js，并且将其挂载在wx上，方便后面使用。  ps：state和mutations这种模式，最初这样定义，只是因为模仿vuex写法，后面在考虑看是否有必要改掉这种模式。相关代码请看示例：
```
/*store.js
*/
import Store from './plugins/store/index'

export default new Store({
  state: {},
  mutations: {}
})
/*app.js
*/
import store from './store'
wx.$store = store
App({
  onLaunch: function () {}
})
```
#### 2.使用
###### 1)在自己创建的store.js中的state里定义变量，mutations里定义方法
```
import Store from './plugins/store/index'

export default new Store({
  state: {
    title:"",
    list:[],
  },
  mutations: {
    SET_TITLE (state, val) {
      // do something
      state.title = val
    },
    SET_LIST(state,val){
      state.list = val
    }
  }
})
```
###### 2)在页面或者组件中修改state中变量的值
```
    wx.$store.commit(mutations_name,value) 
    // commit 接收两个参数。mutations中的方法名和要设置的值
    //当然使用中你会发现，直接wx.$store.state.xxx = xxx 不通过commit，也可以进行赋值操作，目前没做限制，均可，后面可能会考虑加入强制模式，规范化抒写。
```
###### 3)在页面或者组件中手动获取state中变量的值
````
    wx.$store.state.xxx  // xxx是要获取的变量名称
````
###### 4)在页面或者组件需要实时响应数据，实时更新页面。你需要在页面初始化后进行一个initGetter的初始化操作，传入两个参数，this(固定)和要响应的变量名称所组成的一个数组。注：变量名称必须是state里定义过的，并且当state中的某个变量变化后，会对页面中data内的同名变量进行setData，进而实时渲染页面数据。
````
    wx.$store.initGetter(this,['title','list'])  //两个参数均必传
   // 比如如果这样抒写，那么页面中可以直接使用title 和list 属性去做数据绑定。当值发生变化，页面也会重新渲染。

````
###### 5）没办法做到像vuex那样有变化跟踪。但是有时候又需要看到此时state内部的状态，于是目前我把state的整个模型会实时更新进storage。如果调试需要，可以在开发工具中的storage里查看“$store”。
###### 6）store不做长期存储，小程序生命周期结束，store内的存储也将丢失，包括storage内的记录也会做清除，所以请做好相关逻辑处理，避免因丢失带来不便。
#### tips:初级阶段，持续优化中，不过目前的功能基本满足日常需要。
