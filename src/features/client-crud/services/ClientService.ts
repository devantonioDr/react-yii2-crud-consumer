interface ErrorResponse {
    message: string;
}

class ClientService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://10.0.0.15/mnt/';
    }

    private handleResponse = async <T>(response: Response): Promise<T> => {

        // to handle 204 yii2 delete requests.
        if (response.status === 204) return {} as any;

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    };



    private async request<T>(
        method: string,
        endpoint: string,
        data?: any
    ): Promise<T> {

        try {
            const response = await fetch(
                `${this.baseUrl}${endpoint}`,
                {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data && JSON.stringify(data),
                });
            return this.handleResponse<T>(response);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error('Something went wrong');
            }
        }
    }

    public async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>('POST', endpoint, data);
    }

    public async get<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>('GET', endpoint, data);
    }

    public async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>('PUT', endpoint, data);
    }

    public async delete<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>('DELETE', endpoint, data);
    }
}

export default new ClientService();
