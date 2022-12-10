export const gatewayTimeout = () =>
  new Response("Gateway Timeout", {
    status: 504,
  });
