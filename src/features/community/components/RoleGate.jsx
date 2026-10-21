import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { hasAnyRole } from '../permissions';
import EmptyState from '../../../components/ui/EmptyState';
import { ShieldAlert } from 'lucide-react';

export const RoleGate = ({
  allowedRoles = [],
  children,
  fallback = null,
  showNotice = false,
}) => {
  const user = useSelector(selectCurrentUser);
  const isAuthorized = hasAnyRole(user, allowedRoles);

  if (isAuthorized) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showNotice) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Sanctum Restricted"
        description={`This chamber requires credentials in: ${allowedRoles.join(', ')}. Current stature: ${user?.role || 'Guest'}.`}
      />
    );
  }

  return null;
};

export default RoleGate;
