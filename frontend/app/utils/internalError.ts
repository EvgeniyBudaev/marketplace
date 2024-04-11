export const internalError = (body?: BodyInit) =>
  new Response(body ?? "Internal server error", {
    status: 500,
  });
