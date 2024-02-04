export interface Todo {
    id: string;
    text: string;
    description?: string;
    completed: boolean;
    userId: string;
    tenantId?: string;
    createdAt?: string;
    updatedAt?: string;
}