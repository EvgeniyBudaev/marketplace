import { useCallback, useEffect } from "react";
import type { UseFormSetValue } from "react-hook-form";
import { useFetcher } from "@remix-run/react";
import dayjs from "dayjs";
import { ERoutes } from "~/enums";
import { EFormFields } from "~/pages/Admin/Products/ProductAdd";
import type { TFileUploaderProps } from "~/shared/form";
import type { TFile } from "~/types";

type TResponse = {
  onAddImages: TFileUploaderProps["onAddFiles"];
  onDeleteImage: TFileUploaderProps["onDeleteFile"];
  fetcherImagesLoading: boolean;
};

type TUseImagesParams = {
  images?: TFile[];
  setValue: UseFormSetValue<any>;
};

type TUseImages = (params: TUseImagesParams) => TResponse;

export const useImages: TUseImages = ({ images, setValue }) => {
  const fetcherImages = useFetcher();
  const fetcherImagesLoading = fetcherImages.state !== "idle";
  // console.log("images: ", images);
  const onAddImages = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        const newImages = acceptedFiles.map(({ name, size, type }) => ({
          name,
          createdAt: dayjs().utc().toISOString(),
          size,
          type,
        }));

        // setValue(EFormFields.Images, images ? [...images, ...newImages] : [...newImages]);
        setValue(EFormFields.Images, images ? [...images, ...acceptedFiles] : [...acceptedFiles]);
        // fetcherImages.submit(formData, {
        //   method: "post",
        //   action: ERoutes.ResourcesAdminProductAddUploadImage,
        //   encType: "multipart/form-data",
        // });
      }
    },
    [fetcherImages, setValue, images],
  );

  const onDeleteImage = useCallback(
    (deletedFile: TFile) => {
      if (images) {
        setValue(
          EFormFields.Images,
          images.filter(
            (image: TFile) => image.name !== deletedFile.name && image.size !== deletedFile.size,
          ),
        );
      }
    },
    [setValue, images],
  );

  useEffect(() => {
    if (fetcherImages.data && fetcherImages.type === "done") {
      const { name, id, size } = fetcherImages.data;

      if (images) {
        setValue(
          EFormFields.Images,
          images.map((image: TFile) => {
            if (image.name === name && image.size === size) {
              image.id = id;
            }

            return image;
          }),
        );
      }
    }
    // Нужно, чтобы поймать только момент, когда пришел ответ от сервера и записать данные в поле
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherImages.data, fetcherImages.type]);

  return {
    onAddImages,
    onDeleteImage,
    fetcherImagesLoading,
  };
};
