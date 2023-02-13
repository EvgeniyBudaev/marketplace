import React, { useState } from "react";
import type { ChangeEvent, FC } from "react";
import { EFormFields } from "~/pages/Admin/Attributes/SelectableTable";
import { Button, Input, Modal } from "~/uikit";

type TProps = {
  defaultValue: string;
  id: number;
  isOpenModal: boolean;
  onModalClose: () => void;
  onSubmit: ({ id, value }: { id: number; value: string }) => void;
};

export const SelectableEditModal: FC<TProps> = ({
  defaultValue,
  id,
  isOpenModal,
  onModalClose,
  onSubmit,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Form value: ", value);
    onModalClose();
    onSubmit({ id, value });
  };

  return (
    <Modal isOpen={isOpenModal} onCloseModal={onModalClose}>
      <Modal.Header>
        <h2>Редактирование значения</h2>
      </Modal.Header>
      <Modal.Content>
        <div>
          <Input
            defaultValue={value}
            label="Название атрибута"
            name={EFormFields.Value}
            type="text"
            onChange={handleChange}
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={handleSubmit} type={"submit"}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
