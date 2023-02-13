import type { FC } from "react";
import { Button, Modal } from "~/uikit";
import React from "react";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const AttributeDeleteModal: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onCloseModal={onClose}>
      <Modal.Header>
        <h2>Вы действительно хотите удалить атрибут?</h2>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={onSubmit} type={"submit"}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
