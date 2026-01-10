class ApiClient {
    private baseUrl = 'http://localhost:8000'

    private getDefaultHeaders(body?: BodyInit): Record<string, string> {
        if (body instanceof FormData) {
            return {}  // Браузер сам установит multipart/form-data с boundary
        }

        return {
            'Content-Type': 'application/json'
        }
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        // const authStore = useAuthStore?.()
        // const token = authStore?.token
        // if (token) {
        //     (headers as any)['Authorization'] = `Bearer ${token}`
        // }

        const headers = {
            ...this.getDefaultHeaders(options.body),
            ...options.headers
        }


        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: headers
        })

        if (!response.ok) {
            // if (response.status === 401) {
            //     authStore?.logout()
            // }
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint)
    }

    async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined
        })
    }


    /** Для CRUD */
    // async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    //     return this.request<T>(endpoint, {
    //         ...options,
    //         method: 'PUT',
    //         body: data ? JSON.stringify(data) : undefined
    //     })
    // }
    //
    // async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    //     return this.request<T>(endpoint, {
    //         ...options,
    //         method: 'DELETE'
    //     })
    // }

    /** Для формы */
    async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: formData,
        })
    }

    /** Для файла */
    async uploadFile(endpoint: string, file: File): Promise<any> {
        const formData = new FormData()
        formData.append('file', file)

        return this.request(endpoint, {
            method: 'POST',
            body: formData,
        })
    }
}

export const api = new ApiClient()