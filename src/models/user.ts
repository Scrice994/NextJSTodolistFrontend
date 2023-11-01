export interface User {
    id: string
    username?: string,
    email?: string,
    userRole: string,
    status?: string,
    verificationCode?: string,
    tenantId?: string,
    createdAt: string,
    updatedAt: string
}