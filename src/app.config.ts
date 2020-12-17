export default {
  pages: [
    'pages/index/index',
    'pages/room/index',
    'pages/order/index',
    'pages/mind/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fac652',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#808080",
    selectedColor: "#fca652",
    borderStyle:"white",
    list: [
      {
        pagePath: "pages/index/index",
        text: "房态",
        iconPath: "images/aStateDefaultIcon.png",
        selectedIconPath: "images/aStatecheckIcon.png"
      },
      {
        pagePath: "pages/order/index",
        text: "订单",
        iconPath: "images/aStateOrderDefaultIcon.png",
        selectedIconPath: "images/aStateOrderCheckIcon.png"
      },
      {
        pagePath: "pages/room/index",
        text: "房源",
        iconPath: "images/hResourcesDefaultIcon.png",
        selectedIconPath: "images/hResourcesCheckIcon.png"
      },
      {
        pagePath: "pages/mind/index",
        text: "我的",
        iconPath: "images/meDefaultIcon.png",
        selectedIconPath: "images/meCheckIcon.png"
      }
    ]
  },
}