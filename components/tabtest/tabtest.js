// component/tabtest/tabtest.js
Component({

  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

  data: {
    currentindex:0
  },

  methods: {
    itemclick (event)  {
      const index = event.currentTarget.dataset.index
      this.setData({
        currentindex : index
      })
     this.triggerEvent('itemclick',{index,title: this.properties.titles[index]},{})
    }
  },
  externalClasses:[]
})
