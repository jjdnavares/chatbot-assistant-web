import { SpaceSummary } from "../misc/model/space.model"

  export const space_count: SpaceSummary[] = [
    {
        SpaceSummaryId: 1,
        Description: "Total Space", 
        Count: 50,
        Remarks: "Total Parking Slots or Spaces of all office location"
    },
    {
      SpaceSummaryId: 2,
        Description: "Total Vacant", 
        Count: 25,
        Remarks: "Total Vacant Parking Slots or Spaces of all office location"
    },
    {
      SpaceSummaryId: 3,
       Description: "Total Occupied", 
       Count: 15,
       Remarks: "Total Occupied Parking Slots of all office location"
    },
    {
      SpaceSummaryId: 4,
      Description: "Total Reserved", 
      Count: 10,
      Remarks: "Total Reserved Parking Slots of all office location"
    }
  
  ]