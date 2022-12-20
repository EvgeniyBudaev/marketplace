import { inputFromForm } from "remix-domains";
import type { ActionArgs } from "@remix-run/node";
import { Login, loginLinks } from "~/pages/Auth/Login";
import { createBoundaries } from "~/utils";
import { badRequest } from "remix-utils";
import { getResponseError, TDomainErrors } from "~/shared/domain";

interface ActionData {
  formError?: string;
  fieldErrors?: TDomainErrors<TParticipantUpdateFormFieldNames>;
}

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[formValues] ", formValues);

  try {
    const participantUpdateResult = await login(request, formValues);

    if (!participantUpdateResult.success) {
      const fieldErrors = getInputErrors<TParticipantUpdateFormFieldNames>(
        participantUpdateResult,
        PARTICIPANT_UPDATE_FORM_FIELDS,
      );

      return badRequest<ActionData>({ fieldErrors });
    }

    return redirect(
      createPath({
        route: ERoutes.ParticipantDetail,
        params: { id: participantUpdateResult.data.id },
      }),
    );
  } catch (error) {
    const errorResponse = error as Response;

    if (errorResponse.status === 400 || errorResponse.status === 500) {
      const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

      return badRequest<ActionData>({ formError, fieldErrors });
    }

    throw error;
  }
};

export default function LoginPage() {
  return <Login />;
}

export function links() {
  return [...loginLinks()];
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
  statusMap: new Map([[404, () => "errorBoundary.user.notFound"]]),
});
