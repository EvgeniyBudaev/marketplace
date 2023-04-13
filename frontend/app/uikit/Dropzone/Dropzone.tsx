import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import type { DropzoneOptions } from "react-dropzone";
import styles from "./Dropzone.css";

export type TDropzoneProps = {
  children?: ReactNode;
  className?: string;
} & DropzoneOptions;

export const Dropzone: FC<TDropzoneProps> = ({ onDrop, children, className, ...rest }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, ...rest });

  return (
    <div
      {...getRootProps()}
      className={clsx("Dropzone", isDragActive ? "Dropzone__isDragActive" : "", className)}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export function dropzoneLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
