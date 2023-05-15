import isNil from "lodash/isNil";
import type { TFile } from "~/types";

type TFilterDuplicatedFilesResponse = {
  acceptedFiles: TFile[];
  newFiles: TFile[];
};

export const filterDuplicatedFiles = (
  addedFiles: File[],
  files?: TFile[],
): TFilterDuplicatedFilesResponse => {
  const newFiles = !isNil(files) ? [...files] : [];
  const acceptedFiles: TFile[] = [];
  const transformAddedFiles = addedFiles.map((file) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    }),
  );

  transformAddedFiles.forEach((addedFile) => {
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
