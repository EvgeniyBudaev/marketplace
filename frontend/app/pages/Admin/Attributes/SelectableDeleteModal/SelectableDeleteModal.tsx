import type { FC } from "react";
import { Button, Modal } from "~/uikit";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const SelectableDeleteModal: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onCloseModal={onClose}>
      <Modal.Header>
        <h2>Вы действительно хотите удалить значение?</h2>
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
