import type { SessionStorage } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";

const defaultArgs = {
    cookie: {
        name: "__cart",
    },
};

export class CartSession {
    static storage: SessionStorage = createCookieSessionStorage(defaultArgs);

    static init(...args: Parameters<typeof createCookieSessionStorage>): void {
        console.log("args: ", args);
        CartSession.storage = createCookieSessionStorage({
            ...defaultArgs,
            ...args[0],
        });
    }
}