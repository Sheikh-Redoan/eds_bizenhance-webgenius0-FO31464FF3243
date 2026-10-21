import { ROLES } from './constants';

export const hasRole = (user, requiredRole) => {
  if (!user) return false;
  const userRole = (user.role || ROLES.STUDENT).toLowerCase();
  if (userRole === ROLES.ADMIN) return true; // Admin has super-access
  return userRole === requiredRole.toLowerCase();
};

export const hasAnyRole = (user, allowedRoles = []) => {
  if (!user) return false;
  const userRole = (user.role || ROLES.STUDENT).toLowerCase();
  if (userRole === ROLES.ADMIN) return true;
  return allowedRoles.map((r) => r.toLowerCase()).includes(userRole);
};

export const canAccessWing = (user, wingConfig) => {
  if (!wingConfig?.access || wingConfig.access.includes('public')) return true;
  if (!user) return false;
  if (wingConfig.access.includes('member')) return true; // any authenticated member
  return hasAnyRole(user, wingConfig.access);
};

export const canCreateCourse = (user) => hasAnyRole(user, [ROLES.TEACHER, ROLES.ADMIN]);
export const canAuditSong = (user) => hasAnyRole(user, [ROLES.LINGUIST, ROLES.ADMIN]);
export const canManageSupportStatus = (user) => hasRole(user, ROLES.ADMIN);
