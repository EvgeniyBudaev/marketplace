import Image from "next/image";
import React, { memo, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { getInitial, setAtToStringAndPx } from "../../utils";
import classes from "./Avatar.module.scss";

type TProps = {
  className?: string;
  altImage?: string;
  backgroundColor?: string;
  color?: string;
  image?: string;
  size?: number;
  user?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const AvatarComponent: React.FC<TProps> = ({
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
      avatarRef.current.style.setProperty(
        "--avatar-backgroundColor",
        backgroundColor
      );
      avatarRef.current.style.setProperty("--avatar-color", color);
      avatarRef.current.style.setProperty(
        "--avatar-height",
        setAtToStringAndPx(size)
      );
      avatarRef.current.style.setProperty(
        "--avatar-width",
        setAtToStringAndPx(size)
      );
      if (!user) {
        avatarRef.current.style.setProperty(
          "--avatar-border",
          "3px solid #0A0A0B"
        );
      }
    }
  }, [backgroundColor, color, size, user]);

  const renderContent = (user: string, image: string) => {
    if (user && !image) {
      return getInitial(user);
    } else if (!user && image) {
      return (
        <Image
          className={classes.Face}
          src={image}
          alt={altImage}
          height={sizeInner}
          width={sizeInner}
        />
      );
    } else {
      return (
        <Image
          src="/images/avatar.png"
          alt="аватар"
          height={sizeInner}
          width={sizeInner}
        />
      );
    }
  };

  return (
    <div
      className={clsx(classes.Avatar, className)}
      ref={avatarRef}
      onClick={onClick}
    >
      <div className={clsx(classes.Inner)}>
        {renderContent(userAvatar, imageAvatar)}
      </div>
    </div>
  );
};

export const Avatar = memo(AvatarComponent);
