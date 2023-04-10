import type { EPermissions } from "~/enums";
import { getUserSession } from "~/shared/api/auth";
import { checkUserPermission } from "~/utils/permission/checkUserPermission";

export async function checkRequestPermission(
  request: Request,
  permissions: EPermissions[],
): Promise<boolean> {
  const userSession = await getUserSession(request);
  const user = JSON.parse(userSession || "{}");
  return checkUserPermission(user, permissions);
}
