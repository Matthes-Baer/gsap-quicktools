import React, { useRef } from "react";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface AnimationDurations {
  animationInDuration: number;
  animationOutDuration: number;
}

interface GSAPScaleXWrapperProps {
  children?: React.ReactNode;
  elementType?: React.ElementType;
  classNames?: string;
  isVisible?: boolean;
  animationDuration?: number | AnimationDurations;
  transformOrigin?: string;
}

/**
 * A wrapper component that uses GSAP for an opening and closing animation based on the scaleX property.
 *
 * @param {React.ReactNode} children - Optional, the children components to be rendered inside this component. These can be any valid React nodes, including elements, strings, numbers, or fragments.
 * @param {React.ElementType} [elementType = "div"] - Optional, the type of element to be used as the container for the children. This can be any valid HTML tag name as a string (e.g., 'div', 'span', 'section') or a React component.
 * @param {string} [classNames = ""] - Optional, additional CSS class names to apply to the container element for styling purposes. This prop can accommodate classes from CSS frameworks like Tailwind CSS or Bootstrap, as well as custom styles.
 * @param {boolean} [isVisible = true] - Optional, determines if the children components should be rendered or not. When `true`, the children components will scaleX in. When transitioning from `true` to `false`, the children components will scaleX out before being removed. If not set, the wrapper and it's children components will enter but won't have an option to be removed.
 * @param {number | { animationInDuration: number, animationOutDuration: number }} [animationDuration = 0.5] - Optional, sets the duration for the in and out animations. You can also set the animation's in and out duration lengths individually by passing an object with the respective duration lengths.
 * @param {string} [transformOrigin = "center center"] - Optional, change the transformOrigin for the scaleX animations if needed.
 */
export default function GSAPScaleXWrapper({
  children,
  elementType = "div",
  classNames = "",
  isVisible = true,
  animationDuration = 0.5,
  transformOrigin = "center center",
}: GSAPScaleXWrapperProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const gsapWrapper = useRef<HTMLDivElement | null>(null);

  // Check for specific animation duration lengths
  const animationInDuration =
    typeof animationDuration === "number"
      ? animationDuration
      : animationDuration.animationInDuration;
  const animationOutDuration =
    typeof animationDuration === "number"
      ? animationDuration
      : animationDuration.animationOutDuration;

  useGSAP(
    () => {
      if (isVisible) {
        setShouldRender(true);
      } else if (!isVisible && shouldRender) {
        // Animate Out
        gsap.to(gsapWrapper.current, {
          scaleX: 0,
          duration: animationOutDuration,
          onComplete: () => setShouldRender(false),
        });
      }
    },
    { dependencies: [isVisible] }
  );

  useGSAP(
    () => {
      if (isVisible && shouldRender) {
        // Animate In
        gsap.fromTo(
          gsapWrapper.current,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: animationInDuration,
          }
        );
      }
    },
    { dependencies: [shouldRender] }
  );

  if (!shouldRender) return null;

  return React.createElement(
    elementType,
    {
      className: classNames,
      style: { transformOrigin },
      ref: gsapWrapper,
    },
    children
  );
}
