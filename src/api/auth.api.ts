import axiosInstance from './axios';

export const login = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post('/auth/login', { email, password });

    if (res.data.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
