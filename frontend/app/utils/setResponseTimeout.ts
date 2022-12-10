export const setResponseTimeout = (timeout: number): [AbortSignal, NodeJS.Timeout] => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return [controller.signal, timeoutId];
};
