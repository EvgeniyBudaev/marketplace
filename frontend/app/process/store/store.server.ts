// import get from "lodash/get";
// import { getCacheBackend } from "~/process/store";
import type { ICacheBackend } from "~/process/store";
import { getSettings, getSettingsSession } from "~/shared/api/settings";
import type { TSettings } from "~/shared/api/settings";
import { getCartSession } from "~/shared/api/cart";

class UserProfileStore {
  // private cache: ICacheBackend;
  //
  // constructor(cache: ICacheBackend) {
  //   this.cache = cache;
  // }

  public async set(request: Request, data: Record<string, any>) {
    const session = await getSettingsSession(request);
    if (session) {
      const { uuid: id } = session;
      // await this.cache.set(id, data);
    }
  }

  public async loadAndRevalidate(request: Request, id: string) {
    const settingsResponse = await getSettings(request, { uuid: id });
    if (settingsResponse?.success) {
      await this.set(request, settingsResponse.data);
      return settingsResponse.data;
    } else {
      return {};
    }
  }

  public async get(request: Request, uuid?: string) {
    try {
      const settingsSession = await getSettingsSession(request);
      const settings: TSettings = JSON.parse(settingsSession || "{}");
      // console.log("get settings: ", settings);
      // console.log("get uuid: ", uuid);
      // let settingsData = await this.cache.get(settings.uuid);
      let settingsData;
      // if (!settingsData) settingsData = await this.loadAndRevalidate(request, settings.uuid);
      if (!settingsData || !settings) {
        settingsData = await this.loadAndRevalidate(request, settings.uuid ?? uuid);
      }

      return settingsData;
    } catch {
      return {};
    }
  }

  public async getItem<T>(request: Request, key: string, uuid?: string) {
    // public async getItem<T>(request: Request, key: string, defaultValue?: T, uuid?: string) {
    const data = (await this.get(request, uuid)) as Record<string, any>;
    // console.log("getItem data: ", data);
    // return get(data, key, defaultValue);
    return data;
  }
}

// export const userSettingsStore: UserProfileStore =
//   (global as any)._userSettingsStore ||
//   ((global as any)._userSettingsStore = new UserProfileStore(getCacheBackend()));
export const userSettingsStore: UserProfileStore = new UserProfileStore();
