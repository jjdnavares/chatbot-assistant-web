export interface chatResponse {
    role: string,
    content: string
}

export interface chatHistory {
    id: number,
    title: string,
    thread: Array<chatResponse>
}