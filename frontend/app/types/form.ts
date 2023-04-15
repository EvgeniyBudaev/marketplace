export type TParams = Record<string, any>;

// export type TFile = {
//   id?: string | null | undefined;
//   createdAt?: string | null | undefined;
//   name?: string | null | undefined;
//   size?: number | null | undefined;
//   type?: string | null | undefined;
// } & Partial<Pick<File, "lastModified">>;

export type TFile = File;
