import type { TFile } from "~/types";

type TFilterDuplicatedFilesResponse = {
  acceptedFiles: File[];
  newFiles: TFile[];
};

export const filterDuplicatedFiles = (
  addedFiles: File[],
  files: TFile[],
): TFilterDuplicatedFilesResponse => {
  const newFiles = [...files];
  const acceptedFiles: File[] = [];

  addedFiles.forEach((addedFile) => {
    if (!newFiles.find((file) => file.name === addedFile.name && file?.size === addedFile.size)) {
      acceptedFiles.push(addedFile);
      newFiles.push(addedFile);
    }
  });

  return {
    acceptedFiles,
    newFiles,
  };
};
