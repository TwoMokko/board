class ApiClient {
    private baseUrl: string = 'http://localhost:8000'
    private token: string | null = localStorage.getItem('token')

    setToken(token: string) {
        this.token = token
        localStorage.setItem('token', token)
    }
    clearToken() {
        this.token = null
        localStorage.removeItem('token')
    }
    hasToken(): boolean {
        return !!this.token
    }

    getToken(): string | null {
        return this.token
    }

    private getDefaultHeaders(body?: BodyInit): Record<string, string> {
        if (body instanceof FormData) {
            return {}  // Браузер сам установит multipart/form-data с boundary
        }

        return {
            'Content-Type': 'application/json'
        }
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const headers = {
            ...this.getDefaultHeaders(options.body),
            ...options.headers
        }

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`
        }


        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: headers
        })

        if (!response.ok) {
            if (response.status === 401) {
                this.clearToken()
                window.location.href = '/login'
                throw new Error('Не авторизован')
            }
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