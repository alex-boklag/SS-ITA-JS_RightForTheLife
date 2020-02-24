export const useAuthChecker = () =>
  !!(
    sessionStorage.getItem('token') &&
    sessionStorage.getItem('token').length > 30
  );
