const wmpfVoip = requirePlugin('wmpf-voip').default

wmpfVoip.setVoipEndPagePath({
  url: '/pages/contactList/contactList',
  key: 'Call',
})

App({
  onLaunch() {
    wmpfVoip.setCustomBtnText('去开门')
    wmpfVoip.setUIConfig({
      handsFree: true,
      callerUI: {
        cameraRotation: 270,
        objectFit: 'contain',
        aspectRatio: wx.getWindowInfo().screenHeight / wx.getWindowInfo().screenWidth
      },
    })

    // if (wx.cloud) {
    //   wx.cloud.init()
    //   wmpfVoip.setCustomBtnText('去开门')
    //   if (isWmpf) {
    //     setTimeout(() => {
    //       wmpf.getWmpfPushToken({
    //         success: (resp) => {
    //           console.log(`getWmpfPushToken`, resp)
    //           updatePushToken({ sn: config.sn, pushToken: resp.token })
    //         },
    //         fail: (err) => {
    //           console.error(`getWmpfPushToken`, err)
    //         },
    //       })
    //     }, 1000)
    //   }
    // }
  },
})
