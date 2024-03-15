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
}

/**
 * A wrapper component that uses GSAP for fade-in and fade-out as well as slide-in and slide-out animations.
 *
 * @param {React.ElementType} [elementType = "div"] - Optional, set the element type (like `h1` or `p`) that acts as the parent container for the provided child elements. Defaults to "div".
 * @param {React.ReactNode} children - The child component/s that this wrapper will contain. These are the elements that will be subject to the fade and slide animations.
 * @param {string} [classNames = ""] - Optional, additional CSS class names to apply to the wrapper for further styling or specificity. Defaults to an empty string. You may use Tailwind CSS, Bootstrap, or custom CSS classes depending on your application's configuration.
 * @param {boolean} [isVisible = true] - Optional, determines if the child component should be visible/rendered or not. When `true`, the child component will fade in and slide in. When transitioning from `true` to `false`, the child component will fade out and slide out before being removed. Defaults to `true`.
 * @param {number | { animationInDuration: number, animationOutDuration: number }} [animationDuration = 0.5] - Optional, sets the duration for both the fade and slide animations. You can also set the animation's in and out duration lengths individually by passing an object with the respective duration lengths. Defaults to 0.5 seconds for both in and out if not set.
 */

export default function GSAPScaleXWrapper({
  children,
  elementType = "div",
  classNames = "",
  isVisible = true,
  animationDuration = 0.5,
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
      style: { transformOrigin: "center center" },
      ref: gsapWrapper,
    },
    children
  );
}