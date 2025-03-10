// src/utils/axios.ts
import axios from "axios";
import { createClient } from "./supabase/client";

export const createApiClient = async () => {
  const client = new ApiClient();

  await client.init();

  return client;
};

import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Define a class to handle API requests
class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8080/",
      timeout: 10000,
    });

    // Setup interceptors
    this.setupInterceptors();
  }

  public async init() {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;

    this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
      token || ""
    }`;
  }

  // Setting up interceptors
  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add authorization token if available

        return config;
      },
      (error: AxiosError) => {
        // Handle request error here
        console.error("Request Error:", error.message);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Any status code within the range of 2xx will trigger this function
        return response;
      },
      (error: AxiosError) => {
        // Handle errors globally
        if (error.response) {
          // Server responded with a status outside of 2xx
          switch (error.response.status) {
            case 401:
              // Unauthorized, handle token refresh or redirection to login
              console.error("Unauthorized access, redirecting to login...");
              break;
            case 403:
              // Forbidden, user doesn't have the right permissions
              console.error(
                "Forbidden: You do not have access to this resource."
              );
              break;
            case 404:
              // Not found
              console.error("Error 404: Resource not found.");
              break;
            case 500:
              // Internal server error
              console.error("Error 500: Server error.");
              break;
            default:
              console.error(
                `Error ${error.response.status}: ${
                  error.response.data?.message || "Unknown error"
                }`
              );
          }
        } else if (error.request) {
          // Request was made but no response was received
          console.error("No response received from server.");
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error", error.message);
        }

        // Optionally, you can return a custom error message or format
        return Promise.reject(error);
      }
    );
  }

  // Custom error handler
  private handleAxiosError(
    error: AxiosError<{ message: string }> & { message: string }
  ): string {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        return `Error: ${error.response.status} - ${
          error.response.data.message || error.response.data
        }`;
      } else if (error.request) {
        console.error("No Response:", error.request);
        return "Error: No response from server";
      } else {
        console.error("Error Message:", error.message);
        return `Error: ${error.message}`;
      }
    } else {
      return "Error: Unexpected error occurred";
    }
  }
  // GET method
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>["data"]> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw new Error(
        this.handleAxiosError(error as AxiosError<{ message: string }>)
      );
    }
  }

  // POST method
  public async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>["data"] | AxiosError> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(
        this.handleAxiosError(error as AxiosError<{ message: string }>)
      );
    }
  }

  // PUT method
  public async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | AxiosError> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response;
    } catch (error) {
      throw new Error(
        this.handleAxiosError(error as AxiosError<{ message: string }>)
      );
    }
  }

  // DELETE method
  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | AxiosError> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response;
    } catch (error) {
      throw new Error(
        this.handleAxiosError(error as AxiosError<{ message: string }>)
      );
    }
  }

  // PATCH method
  public async patch<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | AxiosError> {
    try {
      return this.axiosInstance.patch<T>(url, data, config);
    } catch (error) {
      throw new Error(
        this.handleAxiosError(error as AxiosError<{ message: string }>)
      );
    }
  }
}

export default ApiClient;
