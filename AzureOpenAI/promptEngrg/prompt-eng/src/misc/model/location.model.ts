import { Timestamp } from "rxjs"

export interface Facility {

    FacilityId: number,
    FacilityName: string,
    Alias:string,
    Longitude: number,
    Latitude: number,
    Country: string,
    State: string,
    Locality: string,
    NearbyAddress: string

}



export interface UserLocation {
   
    Longitude: number,
    Latitude: number
}

