import { isAuthed } from "../middleware";
import { procedures, tRPCContext } from "../trpc";

const authedProcedure = procedures.use(isAuthed);
export const publicProcedure = tRPCContext.procedure;

export default authedProcedure;
