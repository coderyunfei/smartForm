import { sendToGio } from './index'

export const gioKnowledgeBase = (attributes) =>
  sendToGio('track', 'aliyun_callcenter_knowledge_base', attributes)
