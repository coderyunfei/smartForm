import { sendToGio } from './index'

// 绑定用户id
export const gioBindUserId = (attributes) => sendToGio('setUserId', attributes)

// 上传用户信息
export const gioPushUserInfo = (attributes) =>
  sendToGio('people.set', attributes)
