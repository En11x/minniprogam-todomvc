Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    editname:'',
    list:wx.getStorageSync("todos")||[],
    leftcount:0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setleftcount()
    this.setData(this.data)
  },
  /**
   * 点击全选
   */
  selectAll(){
    let flag = this.data.list.some(item=>!item.completed)
    this.data.list.forEach(item => item.completed = flag)
    this.setleftcount()
    // 同步数据
    this.setData(this.data)
    this.savetodos()
  },

  /**
   * 点击icon图标改变item状态
   */
  clickIco(e){
    let itemId = e.target.dataset.id
    let item = this.data.list.find(item=>item.id===itemId)
    item.completed = !item.completed
    this.setleftcount()
    this.setData(this.data)
    this.savetodos()
  },
  /**
   * 点击clear清除item
   */
  clear(e){
    let itemId = e.target.dataset.id
    let itemIndex = this.data.list.findIndex(item => item.id === itemId)
    this.data.list.splice(itemIndex,1)
    this.setleftcount()
    this.setData(this.data)
    this.savetodos()
  },

  /**
   * 添加todo
   */
  addtodo(e){
    let addtodo = e.detail.value
    this.data.list.push({
      id: this.data.list.length>0?this.data.list[this.data.list.length-1].id+1:0,
      name:addtodo,
      completed:false
    })
    this.data.name=''
    this.setleftcount()
    this.setData(this.data)
    this.savetodos()
  },
  
  /**
   * 失去焦点时重置
   */
  reset(){
    this.data.name = ''
    this.data.editname=''
    this.setData(this.data)
  },

  /**
   * 获取修改之前的值
   */
  getEditName(e) {
    this.data.editname = e.detail.value
  },

  /**
   * 修改todo
   */
  edittodo(e){
    let itemId = e.target.dataset.id
    this.data.list.find(item => item.id === itemId).name = e.detail.value
    this.setData(this.data)
    this.savetodos()
  },


  /**
   * 点击清除所有完成的todo
   */
  clearCompleted(){
    this.data.list = this.data.list.filter(item=>!item.completed)
    this.setData(this.data)
    this.savetodos()
  },

  /**
   * 计算剩下的item数量
   */
  setleftcount(){
    this.data.leftcount=this.data.list.filter(item=>!item.completed).length
  },

  /**
   * 本地存储数据
   */
  savetodos(){
    wx.setStorageSync("todos", this.data.list)
  }
})