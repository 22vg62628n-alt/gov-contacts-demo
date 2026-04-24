const ROLE_KEY = 'gov_contacts_current_role'

export const ROLE_OPTIONS = {
  PLATFORM_ADMIN: 'platform_admin',
  ORG_ADMIN: 'org_admin',
  USER: 'user'
}

export const getCurrentRole = () => {
  if (typeof window === 'undefined') return ROLE_OPTIONS.PLATFORM_ADMIN
  return localStorage.getItem(ROLE_KEY) || ROLE_OPTIONS.PLATFORM_ADMIN
}

export const setCurrentRole = (role) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(ROLE_KEY, role)
}

export const hasAnyRole = (allowRoles = []) => {
  if (!allowRoles || allowRoles.length === 0) return true
  return allowRoles.includes(getCurrentRole())
}
