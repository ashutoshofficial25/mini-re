import { User } from 'src/context/AuthContext';
import { apiClient } from './apiClient';

export class RolesApi {
  private readonly baseUrl = '/partner/role';

  async getRoles(params?: Record<string, any>, showErrorToast = false, showSuccessToast = false) {
    const data = await apiClient(
      {
        method: 'GET',
        url: this.baseUrl,
        params,
      },
      {
        showErrorToast,
        showSuccessToast,
      }
    );
    return data || [];
  }

  async getRoleById(id: string, showErrorToast = false, showSuccessToast = false) {
    const data = await apiClient(
      {
        method: 'GET',
        url: `${this.baseUrl}/${id}`,
      },
      {
        showErrorToast,
        showSuccessToast,
      }
    );
    return data ?? null;
  }

  async createRole(payload: any, showErrorToast = true, showSuccessToast = true) {
    const data = await apiClient(
      {
        method: 'POST',
        url: this.baseUrl,
        data: payload,
      },
      {
        showErrorToast,
        showSuccessToast,
      }
    );
    return data ?? null;
  }

  async updateRole(id: string, payload: any, showErrorToast = true, showSuccessToast = true) {
    const data = await apiClient<User | null>(
      {
        method: 'PATCH',
        url: `${this.baseUrl}/${id}`,
        data: payload,
      },
      {
        showErrorToast,
        showSuccessToast,
      }
    );
    return data ?? null;
  }
}

export const rolesApi = new RolesApi();
