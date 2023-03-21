import xbbError from '@xbb/xbb-error'
import xbb from '@xbb/xbb-utils'
import utils from '@/utils'

import { gioBindUserId, gioPushUserInfo } from './common'

const platList = ['dd', 'h5', 'wx', 'lark'] // 顺序不要改变，与传递的值相关
const gioPushData = [
  '多平台web端错误',
  'web钉钉',
  'web独立',
  'web微信',
  'web飞书'
]
const shelfVersion =
  platList.findIndex((item) => xbb.isThirdPC([item], true)) + 1

export const sendToGio = function (...args) {
  if (!utils.cloudCodeEnv()) return

  if (!window.gio) {
    xbbError.errorCatch('埋点函数未运行', 0)
    return
  }

  window.gio('page.set', { client_platform: gioPushData[shelfVersion] })

  const gioPushDataArr = [...args]
  if (gioPushDataArr[0] === 'track') {
    const gioObj = gioPushDataArr[2] || {}
    gioObj.from = gioPushData[shelfVersion]
    gioPushDataArr[2] = gioObj
  }
  window.gio(...gioPushDataArr)
}

export const initBuriedPoint = function () {
  gioBindUserId(utils.LS.get('userId'))
  // 用户信息
  gioPushUserInfo({
    corpid: utils.LS.get('corpid'),
    feeTypeName: utils.LS.get('feeInfo').feeTypeName,
    feeName: utils.LS.get('feeInfo').feeName,
    companyName: utils.LS.get('companyInfo').corpName,
    industry: utils.LS.get('companyInfo').industry
  })
}

export * from './workbench'
