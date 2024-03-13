import { Environment } from "~/environment.server";
import { NodeCacheBackend, RedisCacheBackend } from "~/process/store";
import { ESettingsStore } from "../enums";

export const getCacheBackend = () => {
  console.log("getCacheBackend!!!!!!!!!!!!!!!!!");
  // if (Environment.SETTINGS_STORAGE === ESettingsStore.Redis) {
  //   const options = {
  //     port: Environment.REDIS_SESSION_PORT,
  //     host: Environment.REDIS_SESSION_HOST,
  //     password: Environment.REDIS_SESSION_PASSWORD,
  //     ttl: Environment.CACHE_TTL,
  //     keyPrefix: "profile",
  //   };
  //
  //   return new RedisCacheBackend(options);
  // }
  //
  // const options = { deleteOnExpire: true, stdTTL: Environment.CACHE_TTL };
  // return new NodeCacheBackend(options);
};
