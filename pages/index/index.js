// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    photoList: ['/image/photo1.jpg'],
    photoIndex: 0,
    pageNum:1,
    clickedPageIndex:0,
    isClick:false
  },
  onShareAppMessage(e){
    console.log(e)
    console.log(111)
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  nextPhoto(){
    if(this.data.photoIndex+1<this.data.photoList.length){
      this.setData({
        photoIndex: this.data.photoIndex+1,
        photoSrc: this.data.photoList[this.data.photoIndex]
      })
    }
    
  },
  prePhoto(){
    if(this.data.photoIndex-1>=0){
      this.setData({
        photoIndex: this.data.photoIndex-1,
        photoSrc: this.data.photoList[this.data.photoIndex]
      })
    }
  },
  imageClick(e){
    let index = e.currentTarget.dataset['index']
    this.setData({
      clickedPageIndex: index
    })
    console.log(this.data.photoList)
  },
  addImages(){
    let _this=this
    let image;
    wx.chooseImage({
      count: 9,
      sizeType: 'original',
      sourceType: ['album','canera'],
      success: function(res){
        _this.data.photoList.push(...res.tempFilePaths)
        let list = _this.data.photoList
        console.log(list)
        _this.setData({
          photoList: list
        })
      }
    })

  },
  addNewPage(){
    this.setData({
      pageNum: this.data.pageNum+1
    })
  }
})
