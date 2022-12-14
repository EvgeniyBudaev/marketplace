import { Session } from "@remix-run/node";
import { CsrfSession } from "~/shared/session";

export const csrfSessionStorage = CsrfSession.storage;

export const getCsrfSession = async (request: Request): Promise<Session> => {
  return await csrfSessionStorage.getSession(request.headers.get("Cookie"));
};

export const { commitSession: commitCsrfSession } = csrfSessionStorage;
