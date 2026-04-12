export const getRefreshToken = async () => {
  return fetch('/api/v1/auth/reissue', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};
