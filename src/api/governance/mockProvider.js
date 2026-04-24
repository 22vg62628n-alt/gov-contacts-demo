import { getPersons, savePersons } from '../../utils/personStore'

const KEYS = {
  secretary: 'gov_contacts_secretary_relations',
  lineNodes: 'gov_contacts_line_nodes',
  lineMembers: 'gov_contacts_line_members',
  visibilityLogs: 'gov_contacts_visibility_verify_logs',
  transferRequests: 'gov_contacts_transfer_requests',
  approvalConfig: 'gov_contacts_approval_config',
  externalOrgs: 'gov_contacts_external_orgs',
  externalPersons: 'gov_contacts_external_persons',
  specialOrgs: 'gov_contacts_special_orgs',
  transferSchedule: 'gov_contacts_transfer_schedule'
}
const enableSeed = (import.meta.env.VITE_ENABLE_SEED_DATA || 'true').toLowerCase() === 'true'

const hasStorage = () => typeof window !== 'undefined' && !!window.localStorage
const now = () => new Date().toLocaleString('zh-CN')
const today = () => new Date().toISOString().slice(0, 10)

const parse = (raw, fallback) => {
  try {
    const data = JSON.parse(raw)
    return data ?? fallback
  } catch {
    return fallback
  }
}

const read = (key, seed) => {
  if (!hasStorage()) return enableSeed ? seed : []
  const value = parse(localStorage.getItem(key), null)
  if (!Array.isArray(value) || value.length === 0) {
    const next = enableSeed ? seed : []
    localStorage.setItem(key, JSON.stringify(next))
    return next
  }
  return value
}

const write = (key, list) => {
  if (!hasStorage()) return
  localStorage.setItem(key, JSON.stringify(list))
}

const upsert = (list, payload) => {
  if (payload.id) {
    const idx = list.findIndex((item) => Number(item.id) === Number(payload.id))
    if (idx >= 0) list[idx] = { ...list[idx], ...payload, updatedAt: now() }
    return list
  }
  const maxId = list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0)
  list.unshift({ ...payload, id: maxId + 1, createdAt: now(), updatedAt: now() })
  return list
}

const secretarySeed = [
  { id: 1, leaderId: 10, leaderName: '程冠强（青海省管理员）', secretaryId: 9, secretaryName: '李晗', type: '专职秘书', startDate: '2026-01-01', endDate: '' }
]

const lineNodeSeed = [
  {
    id: 1,
    label: '司法条线',
    code: '403',
    type: 'dir',
    sort: 1,
    sortMode: 'auto',
    children: [
      { id: 11, label: '高院', code: '40301', type: 'branch', sort: 1, bindBranch: '省高院', sortMode: 'auto', children: [] },
      { id: 12, label: '检察院', code: '40302', type: 'branch', sort: 2, bindBranch: '省检察院', sortMode: 'auto', children: [] }
    ]
  }
]

const lineMemberSeed = {
  11: [
    { id: 1, name: '张三', account: 'zhangsan', dept: '省高院', linePosition: '院长', sortWeight: 90, manualSort: 1, sortMode: 'auto' },
    { id: 2, name: '李四', account: 'lisi', dept: '省高院', linePosition: '副院长', sortWeight: 80, manualSort: 2, sortMode: 'auto' }
  ]
}

const approvalConfigSeed = [
  { id: 1, scene: '人员转调', nodes: ['申请人', '部门负责人', '管理员'], configurable: true }
]

const transferSeed = [
  {
    id: 1,
    personId: 2,
    personName: '闫石',
    fromDept: '青海钉技术支撑',
    toDept: '省政府办公厅',
    fromLine: '司法条线',
    toLine: '教育条线',
    effectiveMode: 'immediate',
    effectiveDate: today(),
    status: '待审批',
    currentNode: '部门负责人',
    logs: [{ time: now(), text: '提交转调申请' }]
  }
]
const approvalConfigHistorySeed = []
const transferScheduleSeed = []

const isDueDate = (effectiveDate) => {
  if (!effectiveDate) return true
  return effectiveDate <= today()
}

const externalOrgSeed = [{ id: 1, name: '省外协技术服务中心', status: '正常' }]
const externalPersonSeed = [
  {
    id: 1,
    name: '王协同',
    orgId: 1,
    orgName: '省外协技术服务中心',
    role: '外部协作员',
    dataScope: ['省政府办公厅'],
    status: '审批中',
    expiryDate: '2026-12-31'
  }
]

const specialOrgSeed = [
  { id: 1, name: '应急指挥临时专班', ownerDept: '省应急管理厅', startDate: '2026-03-01', endDate: '2026-05-20', remindDays: 7, remindSent: false, status: '生效中' }
]

export const secretaryApi = {
  async list() { return read(KEYS.secretary, secretarySeed) },
  async save(payload) {
    const list = read(KEYS.secretary, secretarySeed)
    write(KEYS.secretary, upsert(list, payload))
  },
  async remove(id) {
    write(KEYS.secretary, read(KEYS.secretary, secretarySeed).filter((item) => Number(item.id) !== Number(id)))
  }
}

export const lineApi = {
  async tree() { return read(KEYS.lineNodes, lineNodeSeed) },
  async saveTree(tree) { write(KEYS.lineNodes, tree) },
  async members(nodeId) {
    const data = parse(localStorage.getItem(KEYS.lineMembers), lineMemberSeed)
    return data[String(nodeId)] || []
  },
  async saveMembers(nodeId, members) {
    const data = parse(localStorage.getItem(KEYS.lineMembers), lineMemberSeed)
    data[String(nodeId)] = members
    write(KEYS.lineMembers, data)
  }
}

export const visibilityVerifyApi = {
  async verify(input) {
    const hitRule = input.scene === 'search' ? '规则#2 不可见优先' : '规则#6 可见特例'
    const result = input.scene === 'search' ? '不可见' : '可见'
    const explain = result === '可见' ? '命中可见规则，且未命中更高优先级不可见规则' : '命中不可见规则，按优先级覆盖可见规则'
    const record = { id: Date.now(), time: now(), ...input, result, hitRule, explain }
    const list = read(KEYS.visibilityLogs, [])
    list.unshift(record)
    write(KEYS.visibilityLogs, list.slice(0, 200))
    return record
  },
  async logs() { return read(KEYS.visibilityLogs, []) }
}

export const transferApi = {
  async list() { return read(KEYS.transferRequests, transferSeed) },
  async submit(payload) {
    const list = read(KEYS.transferRequests, transferSeed)
    const body = { ...payload, status: '待审批', currentNode: '部门负责人', logs: [{ time: now(), text: '提交转调申请' }] }
    write(KEYS.transferRequests, upsert(list, body))
  },
  async approve(id, action, comment = '') {
    const list = read(KEYS.transferRequests, transferSeed)
    const idx = list.findIndex((item) => Number(item.id) === Number(id))
    if (idx < 0) return
    const item = list[idx]
    item.status = action === 'pass' ? '审批通过' : '审批驳回'
    item.currentNode = action === 'pass' ? '已完成' : '已结束'
    item.logs = [...(item.logs || []), { time: now(), text: `${action === 'pass' ? '审批通过' : '审批驳回'} ${comment}`.trim() }]
    item.updatedAt = now()
    if (action === 'pass') {
      if (item.effectiveMode === 'timed' && !isDueDate(item.effectiveDate)) {
        item.status = '待生效'
        item.currentNode = '待生效队列'
        item.logs = [...(item.logs || []), { time: now(), text: `进入待生效队列，计划生效日期：${item.effectiveDate}` }]
        const schedule = read(KEYS.transferSchedule, transferScheduleSeed)
        if (!schedule.some((task) => Number(task.requestId) === Number(item.id))) {
          schedule.push({
            id: Date.now(),
            requestId: item.id,
            personId: item.personId,
            personName: item.personName,
            effectiveDate: item.effectiveDate,
            status: 'pending',
            createdAt: now()
          })
          write(KEYS.transferSchedule, schedule)
        }
      } else {
        await this.applyTransferResult(item)
      }
    }
    write(KEYS.transferRequests, list)
  },
  async applyTransferResult(item) {
    const persons = getPersons()
    const personIndex = persons.findIndex((person) => Number(person.id) === Number(item.personId))
    if (personIndex < 0) return
    const target = persons[personIndex]
    target.dept = item.toDept
    const existingPrimaryIdx = (target.appointments || []).findIndex((appointment) => appointment.appointmentType === '主职')
    if (existingPrimaryIdx >= 0) {
      target.appointments[existingPrimaryIdx] = {
        ...target.appointments[existingPrimaryIdx],
        dept: item.toDept
      }
    } else {
      target.appointments = [...(target.appointments || []), { dept: item.toDept, appointmentType: '主职', role: '成员' }]
    }
    target.line = item.toLine
    savePersons(persons)
    const verifyLogs = read(KEYS.visibilityLogs, [])
    verifyLogs.unshift({
      id: Date.now(),
      time: now(),
      viewer: '系统',
      target: item.personName,
      scene: 'contacts',
      result: '可见',
      hitRule: '转调联动重算',
      explain: `审批通过后已将 ${item.personName} 同步到 ${item.toDept}/${item.toLine} 并触发可见性重算`
    })
    write(KEYS.visibilityLogs, verifyLogs.slice(0, 200))
  },
  async scheduleList() {
    return read(KEYS.transferSchedule, transferScheduleSeed)
  },
  async runSchedule() {
    const list = read(KEYS.transferRequests, transferSeed)
    const schedule = read(KEYS.transferSchedule, transferScheduleSeed)
    const pendingTasks = schedule.filter((task) => task.status === 'pending' && isDueDate(task.effectiveDate))
    for (const task of pendingTasks) {
      const request = list.find((item) => Number(item.id) === Number(task.requestId))
      if (!request) {
        task.status = 'skipped'
        task.updatedAt = now()
        continue
      }
      await this.applyTransferResult(request)
      request.status = '已生效'
      request.currentNode = '已完成'
      request.updatedAt = now()
      request.logs = [...(request.logs || []), { time: now(), text: '到点自动生效完成' }]
      task.status = 'done'
      task.updatedAt = now()
    }
    write(KEYS.transferRequests, list)
    write(KEYS.transferSchedule, schedule)
    return { processed: pendingTasks.length }
  },
  async config() { return read(KEYS.approvalConfig, approvalConfigSeed) },
  async configHistory() { return read(`${KEYS.approvalConfig}_history`, approvalConfigHistorySeed) },
  async saveConfig(config, operator = '管理员') {
    const current = read(KEYS.approvalConfig, approvalConfigSeed)
    const nextVersion = (current?.[0]?.version || 1) + 1
    const next = (config || []).map((item) => ({ ...item, version: nextVersion, effectNote: item.effectNote || '立即生效' }))
    write(KEYS.approvalConfig, next)
    const history = read(`${KEYS.approvalConfig}_history`, approvalConfigHistorySeed)
    history.unshift({
      id: Date.now(),
      time: now(),
      operator,
      version: nextVersion,
      nodes: next?.[0]?.nodes || [],
      effectNote: next?.[0]?.effectNote || '立即生效'
    })
    write(`${KEYS.approvalConfig}_history`, history.slice(0, 100))
  }
}

export const externalApi = {
  async orgs() { return read(KEYS.externalOrgs, externalOrgSeed) },
  async persons() { return read(KEYS.externalPersons, externalPersonSeed) },
  async savePerson(payload) {
    const list = read(KEYS.externalPersons, externalPersonSeed)
    write(KEYS.externalPersons, upsert(list, payload))
  },
  async approve(id, action) {
    const list = read(KEYS.externalPersons, externalPersonSeed)
    const idx = list.findIndex((item) => Number(item.id) === Number(id))
    if (idx < 0) return
    list[idx].status = action === 'pass' ? '正常' : '驳回'
    list[idx].updatedAt = now()
    write(KEYS.externalPersons, list)
  },
  async checkExpiry() {
    const list = read(KEYS.externalPersons, externalPersonSeed)
    const changed = list.map((item) => {
      if (!item.expiryDate) return item
      if (item.expiryDate < today()) return { ...item, status: '已到期禁用', updatedAt: now() }
      return item
    })
    write(KEYS.externalPersons, changed)
    return changed
  }
}

export const specialOrgApi = {
  async list() { return read(KEYS.specialOrgs, specialOrgSeed) },
  async checkReminder() {
    const list = read(KEYS.specialOrgs, specialOrgSeed)
    const todayDate = new Date(today())
    const updated = list.map((item) => {
      const end = new Date(item.endDate)
      const diff = Math.ceil((end.getTime() - todayDate.getTime()) / (24 * 3600 * 1000))
      const shouldRemind = diff <= (item.remindDays || 7) && diff >= 0
      return { ...item, needRemind: shouldRemind, remindText: shouldRemind ? `距离到期还有${diff}天` : '未到提醒窗口' }
    })
    write(KEYS.specialOrgs, updated)
    return updated
  }
}
