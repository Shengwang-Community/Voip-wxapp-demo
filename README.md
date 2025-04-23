# 微呼叫产品小程序端示例项目

这是微呼叫产品的小程序端示例代码，主要展示如何在微信小程序中实现视频/语音通话功能。该示例项目演示了设备与微信用户之间的双向通话实现方式，适用于智能家居、门禁系统等场景的开发参考。

## 功能特点

- 支持视频通话和语音通话
- 支持双向通话：微信用户可呼叫设备，设备也可呼叫微信用户
- 支持摄像头控制（开启/关闭）
- 支持通话中的界面自定义配置
- 提供设备授权管理功能
- 支持联系人列表管理

## 技术实现

项目基于微信小程序框架开发，主要使用了以下技术：

- 微信小程序VOIP插件 (wmpf-voip)
- 微信硬件平台接口
- 微信小程序云开发（可选）

## 项目结构

```
项目根目录/
├── miniprogram/         // 小程序代码目录
│   ├── api/            // API接口
│   ├── data/           // 项目配置和数据
│   ├── pages/          // 页面文件
│   │   ├── index/      // 主页（设备授权、呼叫设置）
│   │   ├── contactList/   // 联系人列表页
│   │   └── assets/     // 资源文件
│   ├── utils/          // 工具类
│   ├── app.js          // 应用入口
│   ├── app.json        // 应用配置
│   └── app.wxss        // 应用样式
├── project.config.json  // 项目配置文件
└── project.private.config.json // 项目私有配置文件
```

## 配置文件说明

在项目配置文件`project.config.json`中，有几个重要的配置项：

- `miniprogramRoot`: 指定小程序代码的根目录，默认为"miniprogram/"
- `cloudfunctionRoot`: 指定云函数代码的根目录，默认为"cloudfunctions/"
- `srcMiniprogramRoot`: 指定小程序源代码的根目录，通常与miniprogramRoot保持一致
- `cloudfunctionTemplateRoot`: 指定云函数模板的根目录，用于开发时快速创建云函数

**对于初学者**：您通常不需要修改这些路径配置，使用默认值即可。这些配置主要用于自定义项目结构或使用特定的开发工作流。

## 使用场景

1. **智能家居**：连接智能门锁、可视门铃等设备
2. **安防监控**：远程查看监控摄像头
3. **远程办公**：设备间远程通讯
4. **智能门禁**：访客通过小程序呼叫门禁设备
5. **智能手表**：通过小程序实现与智能手表的通话

## 快速开始

### 前置条件

1. 安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 注册[微信小程序账号](https://mp.weixin.qq.com/)（个人或企业均可）
3. 在[微信公众平台](https://mp.weixin.qq.com/)获取小程序AppID

### 配置步骤（详细版）

1. **下载项目**：
   - git clone git@github.com:Shengwang-Community/Voip-wxapp-demo.git

2. **导入项目**：
   - 打开微信开发者工具
   - 点击"项目" -> "导入项目"
   - 选择刚才解压的项目目录
   - 填入您的小程序AppID（如没有，可选择"测试号"）
   - 点击"导入"按钮

3. **修改配置**：
   - 打开`project.config.json`文件，将`appid`修改为您的小程序AppID
   - 打开`data/config.js`文件，修改以下配置：

     ```javascript
     const config = {
       sn: 'YOUR_DEVICE_SN',        // 设备序列号
       modelId: 'YOUR_MODEL_ID',    // 设备模型ID
       appid: "YOUR_APPID",         // 小程序AppID
       secret: "YOUR_SECRET",    
       agora: {                   
         appId: "YOUR_APPID",       // agora appid
         token: "YOUR_TOKEN",
         channelName: "YOUR_CHANNEL_NAME",
         robotUID: "YOUR_ROBOT_UID",
         deviceUID: "YOUR_DEVICE_UID",
         audioCodec: "PCMA"
       }
     }

     ```

4. **申请VOIP插件**：
   - 登录[微信公众平台](https://mp.weixin.qq.com/)
   - 进入"设置" -> "第三方设置" -> "插件管理"
   - 添加插件，搜索"wmpf-voip"并申请

5. **获取modelId**：
   - 登录[微信硬件平台](https://iot.weixin.qq.com/)
   - 在"产品管理"中创建产品
   - 创建后在产品详情页可获取modelId

6. **调试运行**：
   - 在开发者工具中点击"编译"按钮
   - 使用预览功能在真机上体验（VOIP功能需要在真机上测试）

### 功能测试

1. **设备授权**：
   - 打开小程序进入授权页面
   - 填写授权人昵称和设备序列号
   - 点击"授权"按钮

2. **发起通话**：
   - 设备端：安装WMPF，并打开小程序的联系人页面
   - 用户端：在联系人列表中选择设备，点击视频或语音图标发起通话

## 常见问题

1. **找不到设备？**
   - 确认设备已正确授权
   - 检查网络连接是否正常
   - 验证SN和modelId是否正确配置

2. **通话无法接通？**
   - 确认两端网络状况良好
   - 检查摄像头和麦克风权限是否已开启
   - 验证VOIP插件是否正确配置

3. **如何获取真实的设备SN？**
   - 通常印在设备背面或包装盒上
   - 或通过设备管理界面查询
   - 在开发测试阶段可使用模拟值

## 开发说明

- 设备通话功能需要在实体设备上测试，开发时可使用模拟数据
- 部分功能可能需要申请微信小程序特殊接口权限
- 请在微信公众平台申请相关能力后再进行开发测试

## 体验

1. 用户微信打开小程序进入授权页面，在授权栏输入授权人昵称，点击授权。
2. 点击call 开始通话
