import useAuthStore, { AuthState, AuthStore } from '@/zustand/authStore';
import axios, { InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

const getHost = (): string | undefined => {
    const debuggerHost = Constants.expoConfig?.hostUri ?? Constants.manifest?.debuggerHost;
    if (!debuggerHost) return `http://localhost:5001`; // use for web
    return `http://${debuggerHost.split(':')[0]}:5001`;
  };

const api = axios.create({
    baseURL: getHost(),
    responseType: 'json',
    timeout: 10000,
});

export const setupAxios = () => {
    api.interceptors.request.use(
        (request: InternalAxiosRequestConfig) => {
            const accessToken = useAuthStore.getState().authState?.accessToken;

            if (accessToken) {
                request.headers.set("Authorization", `Bearer ${accessToken}`);
            }

            return request;
        },
        (error: any) => Promise.reject(error)
    );
}

export default api;