import type { EPermissions } from "~/enums";
import type { TUser } from "~/shared/api/users/types";
import { checkPermission } from "~/utils/permission/checkPermission";

export function checkUserPermission(user: TUser | null, permissions: EPermissions[]): boolean {
  return checkPermission((user?.groups ?? null) as EPermissions[] | null, permissions);
}
