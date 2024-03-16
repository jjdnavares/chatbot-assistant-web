import { Action } from "../misc/model/action.model"

export const check_in_out_details: Action[] = [
    {
        CheckInOutId: 1,
        ReservationId: 1,
        Action: "Check-In",
        ActionDateTime: new Date("11/9/2023 9:00")
    },
    {
        CheckInOutId: 2,
        ReservationId: 1,
        Action: "Check-Out",
        ActionDateTime: new Date("11/9/2023 17:00 ")
    },
    {
        CheckInOutId: 3,
        ReservationId: 2,
        Action: "Check-In",
        ActionDateTime: new Date("11/10/2023 9:00 ")
    },
    {
        CheckInOutId: 4,
        ReservationId: 2,
        Action: "Check-Out",
        ActionDateTime: new Date("11/10/2023 17:00 ")
    },
    {
        CheckInOutId: 5,
        ReservationId: 3,
        Action: "Check-In",
        ActionDateTime: new Date("11/11/2023 9:00 ")
    },
    {
        CheckInOutId: 6,
        ReservationId: 4,
        Action: "Check-In",
        ActionDateTime: new Date("11/12/2023 9:00 ")
    },
    {
        CheckInOutId: 7,
        ReservationId: 9,
        Action: "Check-In",
        ActionDateTime: new Date("11/17/2023 8:00 ")
    },
    {
        CheckInOutId: 8,
        ReservationId: 9,
        Action: "Check-Out",
        ActionDateTime: new Date("11/17/2023 19:00 ")
    }
]


