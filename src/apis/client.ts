import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

// axios instance
class Client {
  private static instance: Client
  private axiosInstance: AxiosInstance

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client()
    }
    return Client.instance
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<T>(url, config)
  }

  public updateHeaders(headers: Record<string, string>): void {
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }
}

const client = Client.getInstance()

export default client
