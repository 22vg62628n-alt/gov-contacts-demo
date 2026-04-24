const STORAGE_KEY = 'gov_contacts_persons'

const seedPersons = [
  { id: 1, name: '段江', username: 'duanjiang8331', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 2, name: '闫石', username: 'yanshi0615', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 3, name: '张生杰', username: 'zhangshengjie', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 4, name: '袁远尧', username: 'yuanyuanyao2294', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 5, name: '陶博', username: 'taobo7539', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 6, name: '张栩晨', username: 'zhangxuchen2810', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 7, name: '陈杨', username: 'chenyang4117', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 8, name: '王若望', username: 'wangruowang3754', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 9, name: '李晗', username: 'lihan', dept: '青海钉技术支撑', accountType: '自建' },
  { id: 10, name: '程冠强（青海省管理员）', username: 'chengguanqiang', dept: '青海钉技术支撑', accountType: '自建' }
].map((person, index) => ({
  ...person,
  mobile: '',
  phonePrefix: '+86',
  alias: '',
  email: '',
  loginType: { mobile: false, email: false, username: true },
  appointments: [
    {
      dept: person.dept,
      appointmentType: index === 0 ? '主职' : '兼职',
      role: '成员',
      position: '',
      directManager: '',
      positionFax: '',
      officePhone: '',
      officeAddress: '',
      positionLevel: ''
    }
  ]
}))

const hasLocalStorage = () => typeof window !== 'undefined' && !!window.localStorage

const safeParse = (raw) => {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const normalizePerson = (person) => ({
  accountType: '自建',
  loginType: { mobile: false, email: false, username: true, ...(person.loginType || {}) },
  appointments: Array.isArray(person.appointments) && person.appointments.length > 0
    ? person.appointments
    : [{ dept: person.dept || '', appointmentType: '主职', role: '', position: '', directManager: '', positionFax: '', officePhone: '', officeAddress: '', positionLevel: '' }],
  ...person
})

export const getPersons = () => {
  if (!hasLocalStorage()) return seedPersons
  const raw = localStorage.getItem(STORAGE_KEY)
  const parsed = safeParse(raw)
  if (!Array.isArray(parsed) || parsed.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPersons))
    return seedPersons
  }
  return parsed.map(normalizePerson)
}

export const savePersons = (persons) => {
  if (!hasLocalStorage()) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persons.map(normalizePerson)))
}

export const getPersonById = (id) => getPersons().find((person) => Number(person.id) === Number(id))

export const upsertPerson = (inputPerson) => {
  const persons = getPersons()
  const person = normalizePerson(inputPerson)
  const existingIndex = persons.findIndex((item) => Number(item.id) === Number(person.id))
  if (existingIndex >= 0) {
    persons[existingIndex] = { ...persons[existingIndex], ...person }
  } else {
    const maxId = persons.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0)
    persons.push({ ...person, id: maxId + 1 })
  }
  savePersons(persons)
}

export const deletePersonById = (id) => {
  const persons = getPersons().filter((item) => Number(item.id) !== Number(id))
  savePersons(persons)
}
