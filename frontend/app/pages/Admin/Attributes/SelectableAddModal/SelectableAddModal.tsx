import React, { useState } from "react";
import type { ChangeEvent, FC } from "react";
import { EFormFields } from "~/pages/Admin/Attributes/SelectableTable";
import { Button, Input, Modal } from "~/uikit";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ({ value }: { value: string }) => void;
};

export const SelectableAddModal: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {
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
        <h2>Добавление нового значения</h2>
      </Modal.Header>
      <Modal.Content>
        <div>
          <Input
            label="Название значения"
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
