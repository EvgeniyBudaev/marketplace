import {memo, useEffect, useRef, useState} from "react";
import type {FC, MouseEvent} from "react";
import clsx from "clsx";
import styles from "./Avatar.css";
import {formatToStringWithPx, getInitial} from "~/uikit/utils";

type TProps = {
  className?: string;
  altImage?: string;
  backgroundColor?: string;
  color?: string;
  image?: string;
  size?: number;
  user?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

const AvatarComponent: FC<TProps> = ({
                                       className,
                                       altImage = "",
                                       backgroundColor = "#E9E9ED",
                                       color = "#0A0A0B",
                                       image = "",
                                       size = 24,
                                       user = "",
                                       onClick,
                                     }) => {
  const [imageAvatar, setImageAvatar] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const sizeInner = size;
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImageAvatar(image);
    setUserAvatar(user);
  }, [image, user]);

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.style.setProperty("--avatar-backgroundColor", backgroundColor);
      avatarRef.current.style.setProperty("--avatar-color", color);
      avatarRef.current.style.setProperty("--avatar-height", formatToStringWithPx(size));
      avatarRef.current.style.setProperty("--avatar-width", formatToStringWithPx(size));
      if (!user) {
        avatarRef.current.style.setProperty("--avatar-border", "3px solid #0A0A0B");
      }
    }
  }, [backgroundColor, color, size, user]);

  const renderContent = (user: string, image: string) => {
    if (user && !image) {
      return getInitial(user);
    } else if (!user && image) {
      return (
        <img
          className="Avatar-Face"
          src={image}
          alt={altImage}
          height={sizeInner}
          width={sizeInner}
        />
      );
    } else {
      return (
        <img src="/assets/images/avatar.png" alt="аватар" height={sizeInner} width={sizeInner}/>
      );
    }
  };

  return (
    <div className={clsx("Avatar", className)} ref={avatarRef} onClick={onClick}>
      <div className={clsx("Avatar-Inner")}>{renderContent(userAvatar, imageAvatar)}</div>
    </div>
  );
};

export const Avatar = memo(AvatarComponent);

export function avatarLinks() {
  return [{rel: "stylesheet", href: styles}];
}
