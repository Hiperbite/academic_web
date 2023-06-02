import { Event } from "./Event";

export default {
    path: "events/*", childs: [

        { path: "", component: Event },
        { path: "list", component: Event },
        { path: "new", component: Event },
        { path: ":id/update", component: Event },
        { path: ":id", component: Event },
    ]

}