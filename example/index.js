Page({
  data: {
    title:"",
  },
  onLoad: function (options) {
    wx.$store.initGetter(this,['title'])
  },
  sendMessage(){
    let arr = wx.$store.state.list
    arr.push('我是父组件发来的数据')
    wx.$store.commit('SET_LIST',arr)
  },
})
