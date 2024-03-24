import React, { useRef } from "react";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type SlideDirections =
  | "slideDown"
  | "slideUp"
  | "slideFromRight"
  | "slideFromLeft";

interface AnimationDurations {
  animationInDuration: number;
  animationOutDuration: number;
}

interface GSAPFadeSlideWrapperProps {
  children?: React.ReactNode;
  elementType?: React.ElementType;
  classNames?: string;
  isVisible?: boolean;
  slideDirection?: SlideDirections;
  animationDuration?: number | AnimationDurations;
  slideLength?: number;
}

/**
 * A wrapper component that uses GSAP for fade-in & slide-in as well as fade-out & slide-out animations.
 *
 * @param {React.ReactNode} children - Optional, the children components to be rendered inside this component. These can be any valid React nodes, including elements, strings, numbers, or fragments.
 * @param {React.ElementType} [elementType = "div"] - Optional, the type of element to be used as the container for the children. This can be any valid HTML tag name as a string (e.g., 'div', 'span', 'section') or a React component.
 * @param {string} [classNames = ""] - Optional, additional CSS class names to apply to the container element for styling purposes. This prop can accommodate classes from CSS frameworks like Tailwind CSS or Bootstrap, as well as custom styles.
 * @param {boolean} [isVisible = true] - Optional, determines if the children components should be rendered or not. When `true`, the children components will fade in and also slide in. When transitioning from `true` to `false`, the children components will fade out and also slide out before being removed. If not set, the wrapper and it's children components will enter but won't have an option to be removed.
 * @param {string} [slideDirection = "slideUp"] - Optional, specify the direction from where the wrapper will slide in and in which direction it will slide out to.
 * @param {number} [slideLength = 50] - Optional, sets the slide length in pixels.
 * @param {number | { animationInDuration: number, animationOutDuration: number }} [animationDuration = 0.5] - Optional, sets the duration for both the fade and slide animations. You can also set the animation's in and out duration lengths individually by passing an object with the respective duration lengths.
 */
export default function GSAPFadeSlideWrapper({
  children,
  elementType = "div",
  classNames = "",
  isVisible = true,
  animationDuration = 0.5,
  slideDirection = "slideUp",
  slideLength = 50,
}: GSAPFadeSlideWrapperProps) {
  const slideDirections: Record<SlideDirections, "x" | "y"> = {
    slideUp: "y",
    slideDown: "y",
    slideFromRight: "x",
    slideFromLeft: "x",
  };

  const [shouldRender, setShouldRender] = useState(isVisible);
  const gsapWrapper = useRef<HTMLDivElement | null>(null);
  const slideDirectionKey = slideDirections[slideDirection];
  const positiveSlideTarget = ["slideUp", "slideFromRight"].includes(
    slideDirection
  );

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
          opacity: 0,
          duration: animationOutDuration,
          [slideDirectionKey]: positiveSlideTarget
            ? slideLength
            : slideLength * -1,
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
            opacity: 0,
            [slideDirectionKey]: positiveSlideTarget
              ? slideLength
              : slideLength * -1,
          },
          {
            opacity: 1,
            [slideDirectionKey]: 0,
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
      style: { opacity: 0 },
      ref: gsapWrapper,
    },
    children
  );
}
