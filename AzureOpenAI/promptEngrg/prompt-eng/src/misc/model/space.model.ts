export interface Space {
    ParkingSpaceId: number,
    SpaceName: string,
    FacilityId: number,
    SpaceStatus: string,
    Entity: string
}

export interface SpaceDetails {
    ParkingSpaceId: number,
    SpaceName: string,
    ClusterName: string,
    FacilityName: string,    
    SpaceEntity: string,
    FloorPlanURL: string,
    FloorPlanDescription: string,
    FloorName: string,
    SpaceStatus: string,
}


export interface SpaceSummary {
    SpaceSummaryId: number
    Description: string,
    Count: number,
    Remarks: string
   
}


