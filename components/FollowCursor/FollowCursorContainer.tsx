import { useMousePosition } from "@hooks/useMousePosition";
import React from "react";
import { twMerge } from "tailwind-merge";

type FollowCursorContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export const FollowCursorContainer = ({
  children,
  className,
}: FollowCursorContainerProps): React.ReactElement => {
  const { x, y } = useMousePosition();

  const divWidth = 30;

  return (
    <span
      className={twMerge(
        "followCursorContainer hidden lg:flex fixed z-50 pointer-events-none inset-0 items-center justify-center p-4 aspect-square rounded-full transform",
        className
      )}
      style={{
        transform: `translate(${x - divWidth / 2}px, ${y - divWidth / 2}px)`,
        width: divWidth,
      }}
    >
      {children}
    </span>
  );
};
