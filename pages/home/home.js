// pages/home/home.js
import{
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const types = ['pop','new','sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles:["流行","新款","精选"],
    goods:{
      'pop':{page: 0,list: []},
      'new':{page: 0,list: []},
      'sell':{page: 0,list: []}
    },
    currentType : 'pop',
    showBackTop:false,
    isFixed:false,
    tabScroolTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图以及其他图片的数据
    this._getMultiData()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')

  },

  _getMultiData(){
    getMultiData().then(res=>{
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      //保存数据到本地
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    const page = this.data.goods[type].page + 1;
    getGoodsData(type,page).then(res=>{
      const list = res.data.data.list;
      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      const typeKey = `goods.${type}.list`
      const typePage = `goods.${type}.page`
      this.setData({
        [typeKey]:oldList,
        [typePage]: page 
      })

      
    
    })
  },
  handleTabClick(event){
    const index = event.detail.index
    this.setData({
      currentType:types[index]
    })
  },
  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect =>{
      this.data.tabScroolTop = rect.top
    }).exec()
  },


  onReachBottom(){
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options){
    const scrollTop = options.scrollTop
    // console.log(scrollTop)

    const flage1 = scrollTop>=1000

    if(flage1 != this.data.showBackTop){
      this.setData({
        showBackTop:flage1
      })
    }
    const flage2 = scrollTop >= this.data.tabScroolTop
    if(flage2 != this.data.tabScroolTop){
      this.setData({
        isFixed:flage2
      })
    }
  }
})