export default {
  pages: [
    'pages/mind/index',
    'pages/index/index',
    'pages/room/index',
    'pages/order/index',
    'pages/mind/login/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fca652',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: "#808080",
    selectedColor: "#fca652",
    borderStyle:"black",
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
