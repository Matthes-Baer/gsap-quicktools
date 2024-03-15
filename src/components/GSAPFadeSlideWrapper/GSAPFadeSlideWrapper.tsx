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
 * A wrapper component that uses GSAP for fade-in and fade-out as well as slide-in and slide-out animations.
 *
 *
 * @param {React.ReactNode} children - The child component/s that this wrapper will contain. These are the elements that will be subject to the fade and slide animations.
 * @param {React.ElementType} [elementType = "div"] - Optional, set the element type (like `h1` or `p`) that acts as the parent container for the provided child elements. Defaults to "div".
 * @param {string} [classNames = ""] - Optional, additional CSS class names to apply to the wrapper for further styling or specificity. Defaults to an empty string. You may use Tailwind CSS, Bootstrap, or custom CSS classes depending on your application's configuration.
 * @param {boolean} [isVisible = true] - Optional, determines if the child component should be visible/rendered or not. When `true`, the child component will fade in and slide in. When transitioning from `true` to `false`, the child component will fade out and slide out before being removed. If not set, the wrapper and it's child components will enter but won't have an option to be removed.
 * @param {string} [slideDirection = "slideUp"] - Optional, specify the direction from where the wrapper will slide in and in which direction it will slide out to. Default is "none", indicating no slide animation.
 * @param {number} [slideLength = 50] - Optional, sets the slide length in pixels (how far should the wrapper slide in or out?). Defaults to 0, indicating no slide.
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
