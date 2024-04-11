import type { EPermissions } from "#app/enums";
import { getUserSession } from "#app/shared/api/auth";
import { checkUserPermission } from "#app/utils/permission/checkUserPermission";

export async function checkRequestPermission(
  request: Request,
  permissions: EPermissions[]
): Promise<boolean> {
  const userSession = await getUserSession(request);
  const user = JSON.parse(userSession || "{}");
  return checkUserPermission(user, permissions);
}
