// index.js
import { config } from '../../data/index'
import { getDeviceVoIPList } from '../../api/index'
import {
  CameraStatus,
  isWmpf,
} from '../../utils/const.js'
import { requestGetToken, requestLogin, requestGetSnTicket } from "../../utils/request.js"
import { promisify } from "../../utils/utils.js"

const wmpfVoip = requirePlugin('wmpf-voip').default
const envVersion = wx.getAccountInfoSync().miniProgram.envVersion

wmpfVoip.onVoipEvent(event => {
  console.log("onVoipEvent", event)
})



Page({
  data: {
    isWmpf: isWmpf,
    name: '',
    sn: config.sn,
    modelId: config.modelId,
    openid: '',
    voipDevices: [],
    callerCameraStatus: CameraStatus.OPEN,
    listenerCameraStatus: CameraStatus.OPEN,
  },
  onLoad() {
    if (!isWmpf) {
      this.getVoipDevices()
    }
  },
  async getVoipDevices() {
    const { list } = await getDeviceVoIPList()
    console.log(`getDeviceVoIPList: `, list)
    if (typeof list === 'object') {
      this.setData({ voipDevices: list })
    }
  },
  async authorizeIot() {
    const { name, sn, voipDevices } = this.data
    if (!name || name.length === 0 || !sn || sn.length === 0) {
      wx.showToast({ title: '请输入授权人名称和设备 sn', icon: 'none' })
      return
    }
    const { modelId } = config
    const { access_token } = await requestGetToken()
    const res = await requestGetSnTicket(access_token)
    const snTicket = res.sn_ticket
    console.log("getSnTicket", res)
    wx.requestDeviceVoIP({
      sn,
      snTicket,
      modelId,
      deviceName: sn,
      async success(res) {
        console.log(`requestDeviceVoIP`, res)
        // await authorize({ sn, name })
        wx.showToast({
          title: '授权成功',
          icon: 'none',
        })
        const key = `voipDevices[${voipDevices.length}]`
        this.setData({
          [key]: { sn, modelId, status: 1 },
        })
      },
      fail(err) {
        console.error(`requestDeviceVoIP fail`, err)
        wx.showToast({
          title: '授权失败, 请前往设置页开启',
          icon: 'none',
        })
      },
    })
  },
  async call() {
    try {
      const { name, sn, voipDevices, openid, modelId } = this.data
      const res = await promisify(wx.getDeviceVoIPList, {})
      console.log(`getDeviceVoIPList: `, res)

      const payload = {
        "agoraVoIP": {
          "trigger": "MiniApp",
          "transmission": {
            "agora": {
              ...config.agora,
            },
            "wechat": {
              "openId": openid,
              "appId": config.appid,
              "deviceId": config.deviceId,
              "modelId": modelId,
              "landscape": false,
              "subscribeVideoLength": 320,
              "roomType": "video",
              "listenerName": "m",
              "versionType": 0,
              "query": "a=b",
              "callerCameraStatus": 1,
              "listenerCameraStatus": 1,
              "videoCodec": "H264"
            }
          }
        },
        listenerCameraStatus: this.data.listenerCameraStatus,
        callerCameraStatus: this.data.callerCameraStatus
      }

      const options = {
        roomType: "video",
        sn,
        modelId,
        payload: JSON.stringify(payload),
        isCloud: true,
        enableCallerCamera: this.data.callerCameraStatus === CameraStatus.OPEN ? true : false,
        enableListenerCamera: this.data.listenerCameraStatus === CameraStatus.OPEN ? true : false,
      }

      console.log("options", options)


      // call linux 
      const data = await wmpfVoip.callDevice(options)

      // has roomId
      console.log("data", data)

      wx.redirectTo({
        url: wmpfVoip.CALL_PAGE_PATH,
      })
    } catch (err) {
      console.error('callDevice failed:', err)
      wx.showToast({
        title: '呼叫失败',
        icon: 'error',
      })
    }
  },
  async login() {
    const data = await requestLogin()
    const { openid, session_key } = data
    console.log(`openid: ${openid}`)
    this.setData({ openid })
  },
  gotoCallPage() {
    const callerCameraStatus = this.data.callerCameraStatus
    const listenerCameraStatus = this.data.listenerCameraStatus
    wx.redirectTo({
      url: `../contactList/contactList?callerCameraStatus=${callerCameraStatus}&listenerCameraStatus=${listenerCameraStatus}`,
    })
  },
  onCallerCameraStatusChange(e) {
    const value = e.detail.value
    this.setData({
      callerCameraStatus: value ? CameraStatus.OPEN : CameraStatus.CLOSE
    })
  },
  onListenerCameraStatusChange(e) {
    const value = e.detail.value
    this.setData({
      listenerCameraStatus: value ? CameraStatus.OPEN : CameraStatus.CLOSE
    })
  },
})
