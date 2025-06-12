// utils/apiClient.ts
import { AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import axiosInstance from './axios';

type ApiOptions = {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  errorMessage?: string;
};

type ApiResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
};

const defaultOptions: ApiOptions = {
  showSuccessToast: false,
  showErrorToast: true,
};

export async function apiClient<T>(
  config: AxiosRequestConfig,
  options: ApiOptions = {}
): Promise<ApiResponse<T> | null> {
  const { showSuccessToast, showErrorToast, successMessage, errorMessage } = {
    ...defaultOptions,
    ...options,
  };

  try {
    const response = await axiosInstance(config);

    if (showSuccessToast && successMessage) {
      toast.success(successMessage);
    }

    return response.data as ApiResponse<T>;
  } catch (error: any) {
    console.error('API Error:', error);

    if (showErrorToast) {
      const message =
        errorMessage || error?.response?.data?.message || error?.message || 'Something went wrong';
      toast.error(message);
    }

    return null;
  }
}
