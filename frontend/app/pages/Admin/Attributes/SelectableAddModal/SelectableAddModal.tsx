import { useState } from "react";
import type { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { EFormFields } from "~/pages/Admin/Attributes/SelectableTable";
import { Button, ETypographyVariant, Input, Modal, Typography } from "~/uikit";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ({ value }: { value: string }) => void;
};

export const SelectableAddModal: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Form value: ", value);
    onClose();
    onSubmit({ value });
  };

  return (
    <Modal isOpen={isOpen} onCloseModal={onClose}>
      <Modal.Header>
        <Typography variant={ETypographyVariant.TextB2Bold}>
          {t("pages.admin.attributeEdit.addModal.title")}
        </Typography>
      </Modal.Header>
      <Modal.Content>
        <div>
          <Input
            label={t("form.name.title") ?? "Name"}
            name={EFormFields.Value}
            type="text"
            onChange={handleChange}
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={handleSubmit} type={"submit"}>
          {t("common.actions.save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
