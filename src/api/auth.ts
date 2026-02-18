import { apiRequest } from './client';
import { LoginResponse } from '@/types';

export async function loginRequest(payload: {
  email: string;
  password: string;
  tenantId: string;
}): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
