// export const t = (path: string) => path;

export const t = (path: string, options?: { [key: string]: string }) => {
  let translation = path;
  if (options) {
    Object.entries(options).forEach(([variableKey, variableValue]) => {
      translation = translation.replace(variableKey, variableValue);
    });
  }
  return translation;
};
