import { User } from 'src/context/AuthContext';
import { apiClient } from './apiClient';

export class UserApi {
  private readonly baseUrl = '/partner/user';

  async getUsers(params?: Record<string, any>, showErrorToast = false, showSuccessToast = false) {
    const data = await apiClient<User>(
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

  async getUserById(id: string, showErrorToast = false, showSuccessToast = false) {
    const data = await apiClient<User>(
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

  async createUser(payload: Partial<User>, showErrorToast = true, showSuccessToast = true) {
    const data = await apiClient<User | null>(
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

  async updateUser(
    id: string,
    payload: Partial<User>,
    showErrorToast = true,
    showSuccessToast = true
  ) {
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

export const userApi = new UserApi();
