

export interface ReservationDetails {

    ReservationId: number,
    ParkingSpaceId: number,
    PeopleKey: number,
    ReservationStartDateTime: Date,
    ReservationEndDateTime: Date,
    DayofWeek: string,
    PlateNbr: string,
    ReservationStatus: string
    
}


export interface UserSpaceReservation {

    ReservationId: number,
    DatabaseName: string,
    WindowsVerion: string, 
    SQLVersion: string, 
    CPU: string,
    Memory: number,
    Type: string,
    Insights?: string,
    Recommendations?: string,
    Health?: string
}







