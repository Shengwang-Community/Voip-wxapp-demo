import { isWmpf } from "../utils/const"

const config = {
  sn: 'YOUR_DEVICE_SN',
  modelId: 'YOUR_MODEL_ID',
  appid: "YOUR_APPID",
  secret: "YOUR_SECRET",
  agora: {
    appId: "YOUR_AGORA_APPID",
    token: "YOUR_AGORA_TOKEN",
    channelName: "YOUR_AGORA_CHANNEL_NAME",
    robotUID: "YOUR_ROBOT_UID",
    deviceUID: "YOUR_DEVICE_UID",
    audioCodec: "PCMA",
  }
}

if (isWmpf && !config.sn) {
  config.sn = wmpf.getDeviceSerialNumberSync().serialNumber
}

export default config
