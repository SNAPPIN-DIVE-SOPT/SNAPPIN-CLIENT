'use client';

import { getRefreshToken } from '@/auth/apis/refresh.client';
import { getAccessToken } from '@/auth/token.client';
import { createApiRequest } from '@/api/apiRequest.base';

export const apiRequest = createApiRequest({
  getAccessToken,
  getRefreshToken,
});
