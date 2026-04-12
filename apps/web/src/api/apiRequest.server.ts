import 'server-only';

import { getRefreshToken } from '@/auth/apis/refresh.server';
import { getAccessToken } from '@/auth/token.server';
import { createApiRequest } from '@/api/apiRequest.base';

export const apiRequest = createApiRequest({
  getAccessToken,
  getRefreshToken,
});
