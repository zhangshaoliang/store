Component({
  data: {
    list:null
  },
  ready () {
    wx.$store.initGetter(this,['list','title'])  // 必传参数 this。第二个参数可选。传递变量数组
  }
})
