/**
 * name store
 * version v1.0.0
 * author zhangshaoliang
 *
 */
class Watch {
  constructor (obj, callback) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      throw new Error('传入第一个参数必须是对象')
    }
    this.observe(obj, callback)
  }

  observe (obj, callback) {
    Object.keys(obj).forEach((key) => {
      let oldVal = obj[key]
      let _key = key
      Object.defineProperty(obj, key, {
        get: () => {
          return oldVal
        },
        set: (newVal => {
          oldVal = newVal
          callback(_key, newVal)
        }).bind(this)
      })
    }, this)
  }
}

class Store {
  mutations = {}
  state = {}
  getters = []

  constructor (options = {}) {
    this.state = options.state
    this.mutations = options.mutations
    this.watch()
    wx.removeStorageSync('$store')
    wx.setStorageSync('$store',this.state)
  }

  commit (commitType, payload) {
    this.mutations[commitType](this.state, payload)
  }

  initGetter (_this, variables = []) {
    this.getters.push({
      _this: _this,
      variables: variables
    })
    var obj = {}
    // 初始化默认值
    variables.forEach(key => {
      obj = {}
      obj[key] = this.state[key]
      _this.setData(obj)
    })
  }

  watch () {
    let obj = {}
    new Watch(this.state, (key, value) => {
      this.getters.forEach((item, index) => {
        if (item.variables.toString().indexOf(key) !== -1) {
          obj = {}
          obj[key] = value
          this.getters[index]._this.setData(obj)
        }
      })
      wx.setStorageSync('$store',this.state)
    })
  }
}

export default Store


