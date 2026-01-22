'use client';

const LOGIN_STATUS_KEY = 'LoginStatus';

export type LoginStatus = 'logged_in' | 'logged_out';

export function getLoginStatus(): LoginStatus {
  if (typeof window === 'undefined') return 'logged_out';
  return localStorage.getItem(LOGIN_STATUS_KEY) === 'logged_in'
    ? 'logged_in'
    : 'logged_out';
}

export function setLoginStatus(status: LoginStatus) {
  localStorage.setItem(LOGIN_STATUS_KEY, status);
  window.dispatchEvent(new Event('auth:changed'));
}