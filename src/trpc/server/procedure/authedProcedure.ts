import { isAuthed } from "../middleware/sessionMiddleware";
import { procedures } from "~/trpc/trpc";

export const authedProcedure = procedures.use(isAuthed);
