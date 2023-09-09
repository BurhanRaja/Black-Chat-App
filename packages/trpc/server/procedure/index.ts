import { isAuthed } from "../middleware/sessionMiddleware";
import { procedures, tRPCContext } from "../trpc";

export const authedProcedure = procedures.use(isAuthed);

export const publicprocedure = tRPCContext.procedure;
