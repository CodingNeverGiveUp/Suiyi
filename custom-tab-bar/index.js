Component({
  properties: {},
  data: {
    touchS: [0, 0],
    touchE: [0, 0],
    primaryColor: getApp().globalData.primaryColor,
    rgbaPrimaryColor: getApp().colorRgba(getApp().globalData.primaryColor, .2),
    useSidebar: getApp().globalData.useSidebar,
    isPad: getApp().globalData.isPad,
    mainStyle: "",
    floatStyle: "",
    sidebarStyle: "",
    slide: false,
    masked: false,
  },
  methods: {
    back() {
      this.setData({
        mainStyle: "",
        floatStyle: "",
        sidebarStyle: "",
        slide: false,
      })
    },
    sideSwitch(e) {
      const path = e.currentTarget.dataset.path;
      setTimeout(() => {
        wx.switchTab({
          url: path,
        });
      }, 250);
    },
    switch (e) {
      const path = e.currentTarget.dataset.path;
      this.setData({
        mainStyle: "",
        floatStyle: "",
        slide: false,
      })
      setTimeout(() => {
        wx.switchTab({
          url: path,
        });
      }, 250);
    },
    record() {
      if (getApp().globalData.isPad) {

      } else {
        this.setData({
          mainStyle: "height:250px;",
          floatStyle: (this.data.isPad ? "bottom:210px;" : this.data.useSidebar ? "bottom:210px;" : "bottom:275px;") + "transform: rotate(45deg);",
          slide: true,
        })
      }
    },
    menuTap() {
      if (this.data.slide) {
        this.setData({
          slide: false,
          sidebarStyle: "",
        })
      } else {
        this.setData({
          slide: true,
          sidebarStyle: "left: 0",
        })
      }
    },
    floatTap() {
      if (this.data.slide) {
        this.setData({
          mainStyle: "",
          floatStyle: "",
          slide: false,
        })
      } else {}
    },
    touchStart: function (e) {
      // console.log(e.touches[0].pageX)
      let sx = e.touches[0].pageX
      let sy = e.touches[0].pageY
      this.data.touchS = [sx, sy]
    },
    touchMove: function (e) {
      let sx = e.touches[0].pageX;
      let sy = e.touches[0].pageY;
      this.data.touchE = [sx, sy]
    },
    touchEnd: function (e) {
      let start = this.data.touchS
      let end = this.data.touchE
      console.log(start)
      console.log(end)
      if (start[1] < end[1] - 70) {
        console.log('下滑')
        this.setData({
          mainStyle: "",
          floatStyle: "",
          slide: false
        })
      } else if (start[1] > end[1] + 70) {
        console.log('上滑')
        if (getApp().globalData.isPad) {

        } else {
          this.setData({
            mainStyle: "height:250px;",
            floatStyle: (this.data.isPad ? "bottom:210px;" : this.data.useSidebar ? "bottom:210px;" : "bottom:275px;") + "transform: rotate(45deg);",
            slide: true,
          })
        }
      } else {
        console.log('静止')
      }
    },
  }
})