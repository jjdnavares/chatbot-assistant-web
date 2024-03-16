export interface UserProfile {

    PeopleKey: number,
    LastNm: string,
    FirstNm: string,
    Eid: string,
    CareerLevelDesc: string   
    Role: string[],
    Profile: string,
    MDPeopleKey?: number
}


export interface UserReservationDetails {

    Id: number,
    Facility: string,
    ParkingId: number,
    ReservationStartDateTime: Date,
    ReservationEndDateTime: Date  
    
}





