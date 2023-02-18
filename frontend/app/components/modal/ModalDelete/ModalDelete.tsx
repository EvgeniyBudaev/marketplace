import type { FC } from "react";
import { Button, Modal } from "~/uikit";
import styles from "./ModalDelete.module.css";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const ModalDelete: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onCloseModal={onClose}>
      <Modal.Header>
        <h2>Вы действительно хотите удалить?</h2>
      </Modal.Header>
      <Modal.Footer>
        <div className="ModalDelete-Footer">
          <Button className="ModalDelete-Cancel" onClick={onClose}>
            Отменить
          </Button>
          <Button onClick={onSubmit} type={"submit"}>
            Удалить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export function modalDeleteLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
