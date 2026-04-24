const notImplemented = async (name) => {
  throw new Error(`[realProvider] ${name} not implemented. Configure backend endpoints first.`)
}

export const secretaryApi = {
  list: () => notImplemented('secretaryApi.list'),
  save: () => notImplemented('secretaryApi.save'),
  remove: () => notImplemented('secretaryApi.remove')
}

export const lineApi = {
  tree: () => notImplemented('lineApi.tree'),
  saveTree: () => notImplemented('lineApi.saveTree'),
  members: () => notImplemented('lineApi.members'),
  saveMembers: () => notImplemented('lineApi.saveMembers')
}

export const visibilityVerifyApi = {
  verify: () => notImplemented('visibilityVerifyApi.verify'),
  logs: () => notImplemented('visibilityVerifyApi.logs')
}

export const transferApi = {
  list: () => notImplemented('transferApi.list'),
  submit: () => notImplemented('transferApi.submit'),
  approve: () => notImplemented('transferApi.approve'),
  applyTransferResult: () => notImplemented('transferApi.applyTransferResult'),
  scheduleList: () => notImplemented('transferApi.scheduleList'),
  runSchedule: () => notImplemented('transferApi.runSchedule'),
  config: () => notImplemented('transferApi.config'),
  configHistory: () => notImplemented('transferApi.configHistory'),
  saveConfig: () => notImplemented('transferApi.saveConfig')
}

export const externalApi = {
  orgs: () => notImplemented('externalApi.orgs'),
  persons: () => notImplemented('externalApi.persons'),
  savePerson: () => notImplemented('externalApi.savePerson'),
  approve: () => notImplemented('externalApi.approve'),
  checkExpiry: () => notImplemented('externalApi.checkExpiry')
}

export const specialOrgApi = {
  list: () => notImplemented('specialOrgApi.list'),
  checkReminder: () => notImplemented('specialOrgApi.checkReminder')
}
