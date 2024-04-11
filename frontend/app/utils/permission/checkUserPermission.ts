import type { EPermissions } from "#app/enums";
import type { TUser } from "#app/shared/api/users/types";
import { checkPermission } from "#app/utils/permission/checkPermission";

export function checkUserPermission(
  user: TUser | null,
  permissions: EPermissions[]
): boolean {
  return checkPermission(
    (user?.permissions ?? null) as EPermissions[] | null,
    permissions
  );
}
