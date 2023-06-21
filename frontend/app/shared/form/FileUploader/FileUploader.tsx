import clsx from "clsx";
import {useCallback, useEffect, useState} from "react";
import type {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import isNil from "lodash/isNil";
import {Previews, previewsLinks} from "~/shared/form/FileUploader/Previews";
import {filterDuplicatedFiles, getTypes} from "~/shared/form/FileUploader/utils";
import type {TFile} from "~/types";
import {Button, Dropzone, ETypographyVariant, Typography} from "~/uikit";
import type {TDropzoneProps} from "~/uikit";
import styles from "./FileUploader.css";

export type TFileUploaderProps = {
  files?: TFile[];
  Input: ReactElement;
  isLoading?: boolean;
  maxFiles?: number;
  onAddFile: (file: File) => void;
  onAddFiles: (acceptedFiles: TFile[], files: TFile[]) => void;
  onDeleteFile: (deletedFile: TFile, files: TFile[]) => void;
} & TDropzoneProps;

export const FileUploader: FC<TFileUploaderProps> = ({
                                                       accept,
                                                       files,
                                                       Input,
                                                       isLoading,
                                                       maxFiles,
                                                       onAddFile,
                                                       onAddFiles,
                                                       onDeleteFile,
                                                       ...rest
                                                     }) => {
  const {t} = useTranslation();
  const types = getTypes(accept);
  const [countFiles, setCountFiles] = useState(1);

  const onDrop = useCallback(
    (addedFiles: File[]) => {
      if (maxFiles && countFiles > maxFiles) return;
      const {acceptedFiles, newFiles} = filterDuplicatedFiles(addedFiles, files);
      onAddFiles(acceptedFiles, newFiles);
      setCountFiles(prevState => prevState + 1);
    },
    [countFiles, files, maxFiles, onAddFiles],
  );

  const onDelete = useCallback(
    (deletedFile: TFile) => {
      if (files) {
        let newFiles = [...files];
        newFiles = newFiles.filter((file) => file !== deletedFile);
        onDeleteFile(deletedFile, newFiles);
        setCountFiles(prevState => prevState - 1);
      }
    },
    [onDeleteFile, files],
  );

  // useEffect(() => {
  //   if (isNil(files)) return;
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () =>
  //     files.forEach((file) => (file?.preview ? URL.revokeObjectURL(file.preview) : file));
  // }, [files]);

  const handleLoadImage = (file: TFile) => {
    return file?.preview ? URL.revokeObjectURL(file.preview) : file;
  };

  return (
    <div className="FileUploader">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        disabled={isLoading}
        className={clsx("FileUploader-Dropzone", {"FileUploader-Dropzone__isLoading": isLoading})}
        {...rest}
      >
        <div className="FileUploader-Dropzone-Inner">
          {Input}
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("fileUploader.title")}
          </Typography>
          {types && (
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("fileUploader.subTitle", {types})}
            </Typography>
          )}
          <Button className="FileUploader-Dropzone-Button">{t("fileUploader.action")}</Button>
        </div>
      </Dropzone>
      <Previews
        className="FileUploader-Previews"
        files={files}
        onAddFile={onAddFile}
        onDeleteFile={onDelete}
        onLoad={handleLoadImage}
      />
    </div>
  );
};

export function fileUploaderLinks() {
  return [{rel: "stylesheet", href: styles}, ...previewsLinks()];
}
