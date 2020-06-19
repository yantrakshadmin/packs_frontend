import { useSelector } from 'react-redux';

export const useProtected = (allowed = []) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.type);
  return isAuthenticated && allowed && allowed.indexOf(userType) > -1;
};

export const useUser = () => {
  return useSelector((state) => state.auth);
};
