import type { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import isNil from "lodash/isNil";
import type { TFile } from "~/types";
import { Icon, Tooltip } from "~/uikit";
import styles from "./Previews.css";

type TProps = {
  className?: string;
  files?: TFile[];
  onAddFile?: (file: TFile) => void;
  onDeleteFile?: (file: TFile) => void;
  onLoad: (file: TFile) => void;
};

export const Previews: FC<TProps> = ({ className, files, onAddFile, onDeleteFile, onLoad }) => {
  const { t } = useTranslation();

  const handleAddFile = (file: TFile) => {
    onAddFile?.(file);
  };

  const handleDeleteFile = (file: TFile) => {
    onDeleteFile?.(file);
  };

  const renderThumbs =
    !isNil(files) &&
    files.map((file) => (
      <div className="Previews-Thumb" key={file?.name || "" + file?.lastModified}>
        <div className="Previews-Thumb-Inner">
          {!isNil(file.preview) && (
            <img
              alt={file.name}
              className="Previews-Thumb-Image"
              src={file.preview}
              // Revoke data uri after image is loaded
              onLoad={() => onLoad(file)}
            />
          )}
        </div>
        <div className="Previews-File">
          <div className="Previews-File-Inner">
            <div className="Previews-File-IconWrapper">
              <Icon className="Previews-File-ImageIcon" type="Image" />
            </div>
            <div className="Previews-File-Name">{file.name}</div>
          </div>

          <div className="Previews-File-IconWrapper">
            <Tooltip message={t("pages.admin.productAdd.previews.addFile")}>
              <Icon
                className="Previews-File-AddIcon"
                onClick={() => handleAddFile(file)}
                type="AddCircleOutline"
              />
            </Tooltip>
            <Tooltip message={t("pages.admin.productAdd.previews.deleteFile")}>
              <Icon
                className="Previews-File-TrashIcon"
                onClick={() => handleDeleteFile(file)}
                type="Trash"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    ));

  return <aside className={clsx("Previews", className)}>{renderThumbs}</aside>;
};

export function previewsLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
