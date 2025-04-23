import { config } from "../data/index"
import { promisify } from "./utils"

export const requestLogin = async () => {
  const { code } = await wx.login()
  console.log(`code: ${code}`)
  const { data } = await promisify(wx.request, {
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    method: "GET",
    data: {
      appid: config.appid,
      secret: config.secret,
      js_code: code,
      grant_type: "authorization_code"
    }
  })

  return data
}


export const requestGetToken = async () => {
  const { data } = await promisify(wx.request, {
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    method: "GET",
    data: {
      appid: config.appid,
      secret: config.secret,
      grant_type: "client_credential"
    }
  })

  return data
}

export const requestGetSnTicket = async (accessToken) => {
  const { data } = await promisify(wx.request, {
    url: `https://api.weixin.qq.com/wxa/getsnticket?access_token=${accessToken}`,
    method: "POST",
    data: {
      model_id: config.modelId,
      sn: config.sn,
    }
  })

  return data
}
