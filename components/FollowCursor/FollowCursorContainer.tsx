import { useMousePosition } from "@hooks/useMousePosition";
import { useGlobalState } from "@reactivers/use-global-state";
import React, { useEffect } from "react";

import { twMerge } from "tailwind-merge";

type FollowCursorContainerProps = {
  children?: React.ReactNode;
  className?: string;
  style?: any;
};

export const FollowCursorContainer = ({
  children,
  className,
  style,
}: FollowCursorContainerProps): React.ReactElement => {
  const { x, y } = useMousePosition();
  const { globalState } = useGlobalState();
  const divWidth = 30;

  useEffect(() => {
    console.log({ globalState }, []);
  });

  return (
    <span
      className={twMerge(
        "followCursorContainer hidden lg:flex fixed z-50 pointer-events-none items-center justify-center p-4 aspect-square rounded-full transform",
        className
      )}
      style={{
        transform: `translate(${x - divWidth / 2}px, ${y - divWidth / 2}px)`,
        width: divWidth,
        // ...style,
      }}
    >
      {children}
    </span>
  );
};
