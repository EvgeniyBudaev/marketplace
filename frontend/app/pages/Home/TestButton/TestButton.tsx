import type { FC } from "react";
import styles from "./TestButton.css";

export const TestButton: FC = () => {
  return (
    <div className="TestButton">
      <div className="TestButton-Inner">
        <span>Применить</span>
      </div>
    </div>
  );
};

export function testButtonLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
