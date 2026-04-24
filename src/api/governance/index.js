import * as mockProvider from './mockProvider'
import * as realProvider from './realProvider'

const providerName = (import.meta.env.VITE_DATA_PROVIDER || 'mock').toLowerCase()
const isBlockedReal = providerName === 'real'
if (isBlockedReal) {
  console.warn('[governance] real provider is blocked in current product baseline, fallback to mock provider.')
}
const provider = isBlockedReal ? mockProvider : (providerName === 'real' ? realProvider : mockProvider)

export const DATA_PROVIDER = 'mock'

export const secretaryApi = provider.secretaryApi
export const lineApi = provider.lineApi
export const visibilityVerifyApi = provider.visibilityVerifyApi
export const transferApi = provider.transferApi
export const externalApi = provider.externalApi
export const specialOrgApi = provider.specialOrgApi
