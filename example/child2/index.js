Component({
  /**
   * 组件的属性列表
   */
  properties: {
    formData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sendMessage(){
      let arr = wx.$store.state.list
      arr.push('我是子组件发来的数据')
      wx.$store.commit('SET_LIST',arr)
    },
    changeTitle(){
      wx.$store.commit('SET_TITLE','标题内容被蓝色背景子组件修改了')
    }
  },
  ready () {
    wx.$store.initGetter(this,['title'])
  }
})
