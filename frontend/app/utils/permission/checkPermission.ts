import type { EPermissions } from "~/enums";

export function checkPermission(
  userPermissions: EPermissions[] | null,
  permissions: EPermissions[],
): boolean {
  if (!permissions.length) {
    return true;
  }

  if (!userPermissions) {
    return false;
  }
  return userPermissions.some((item) => permissions.includes(item));
}
