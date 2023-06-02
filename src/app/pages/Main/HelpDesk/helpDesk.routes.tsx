
import { Page } from "../../../layout/Page";
import { DetailsClassRoom } from "../pedagogical/ClassRoom/DetailClassRoom/DetailClassRoom";
import { NewClassRoom } from "../pedagogical/ClassRoom/NewClassRoom";
import { UpdateClassRoom } from "../pedagogical/ClassRoom/UpdateClassRoom";
import { Chat } from "./Chat/Chat";
import eventRoutes from './Event/routes.routes'
import { DetailTicket } from "./Ticket/DetailTicket/DetailTicket";
import { NewTicket } from "./Ticket/NewTicket";
import { Ticket } from "./Ticket/Ticket";
import { UpdateTicket } from "./Ticket/UpdateTicket";
const routes: any =
  [

    {
      path: "tickets/*", childs: [

        { path: "", component: Ticket },
        { path: "list", component: Ticket },
        { path: "new", component: NewTicket },
        { path: ":id/update", component: UpdateTicket },
        { path: ":id", component: DetailTicket },
      ]
    },
    {
      path: "events/*", childs: [

        { path: "", component: Event },
        { path: "list", component: Event },
        { path: "new", component: NewTicket },
        { path: ":id/update", component: UpdateTicket },
        { path: ":id", component: DetailTicket },
      ]
    },
    {
      path: "chat/*", childs: [

        { path: "", component: Chat },
        { path: "list", component: Chat },
        { path: "new/*", component: NewClassRoom },
        { path: "update/:id/*", component: UpdateClassRoom },
        { path: ":id", component: DetailsClassRoom },
      ]
    }]

  ;
routes.push(eventRoutes)
const hr={
  path: "help-desk/*", component: <Page type={"helpDesk"} />, childs: [

    {
      path: "tickets/*", childs: [

        { path: "", component: Ticket },
        { path: "list", component: Ticket },
        { path: "new", component: NewTicket },
        { path: ":id/update", component: UpdateTicket },
        { path: ":id", component: DetailTicket },
      ]
    },
    {
      path: "events/*", childs: [

        { path: "", component: Event },
        { path: "list", component: Event },
        { path: "new", component: NewTicket },
        { path: ":id/update", component: UpdateTicket },
        { path: ":id", component: DetailTicket },
      ]
    },
    {
      path: "chat/*", childs: [

        { path: "", component: Chat },
        { path: "list", component: Chat },
        { path: "new/*", component: NewClassRoom },
        { path: "update/:id/*", component: UpdateClassRoom },
        { path: ":id", component: DetailsClassRoom },
      ]
    }]
};
export default hr;