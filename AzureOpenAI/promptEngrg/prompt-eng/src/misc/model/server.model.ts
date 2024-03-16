export interface ServerDetails 
{
    Id: number,
    Name: string,
    Airid: number,
    WindowsVerion: string, 
    SQLVersion: string, 
    CPU: string,
    Memory: number,
    Type: string,
    Health?: string
    Insights?: string,
    Recommendations?: string,
    idle?: string,
    free?: string,
    iowait?: string,
    blocked_connections?: string,
    cache_hit_ratio?: string
}







