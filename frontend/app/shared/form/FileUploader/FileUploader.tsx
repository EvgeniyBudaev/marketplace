import clsx from "clsx";
import { useCallback } from "react";
import type { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import isNil from "lodash/isNil";
import { filterDuplicatedFiles, getTypes } from "~/shared/form/FileUploader/utils";
import type { TFile } from "~/types";
import { Button, Dropzone, ETypographyVariant, Icon, Typography } from "~/uikit";
import type { TDropzoneProps } from "~/uikit";
import styles from "./FileUploader.css";

export type TFileUploaderProps = {
  files?: TFile[];
  Input: ReactElement;
  isLoading?: boolean;
  onAddFiles: (acceptedFiles: File[], files: TFile[]) => void;
  onDeleteFile: (deletedFile: File, files: TFile[]) => void;
} & TDropzoneProps;

export const FileUploader: FC<TFileUploaderProps> = ({
  accept,
  files,
  Input,
  isLoading,
  onAddFiles,
  onDeleteFile,
  ...rest
}) => {
  console.log("files: ", files);
  const { t } = useTranslation();
  const types = getTypes(accept);

  const onDrop = useCallback(
    (addedFiles: File[]) => {
      const { acceptedFiles, newFiles } = filterDuplicatedFiles(addedFiles, files);
      onAddFiles(acceptedFiles, newFiles);
    },
    [onAddFiles, files],
  );

  return (
    <div className="FileUploader">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        disabled={isLoading}
        className={clsx({ "FileUploader-Dropzone__isLoading": isLoading })}
        {...rest}
      >
        <div className="FileUploader-Dropzone-Inner">
          {Input}
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("fileUploader.title")}
          </Typography>
          {types && (
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("fileUploader.subTitle", { types })}
            </Typography>
          )}
          <Button className="FileUploader-Dropzone-Button">{t("fileUploader.action")}</Button>
        </div>
      </Dropzone>
      <div className="FileUploader-Files">
        {!isNil(files) &&
          files.map((file) => (
            <div
              className="FileUploader-File"
              key={file?.name || "" + file?.lastModified}
              // key={file?.name || "" + (file?.lastModified || file?.createdAt)}
            >
              <Icon type="Image" />
              <div>{file.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export function fileUploaderLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
