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
  children: React.ReactNode;
  classNames: string;
  slideDirection?: SlideDirections;
  isVisible?: boolean;
  animationDuration?: number | AnimationDurations;
  slideLength?: number;
}

/**
 * A wrapper component that uses GSAP for fade-in and fade-out as well as slide-in and slide-out animations.
 *
 * @param {React.ReactNode} children The child component/s that this wrapper will contain. These are the elements that will be subject to the fade in/out animations.
 * @param {string} classNames Additional CSS class names to apply to the wrapper for further styling or specificity. You may use Tailwind CSS, Bootstrap or custom CSS classes depending on your application's configuration.
 * @param {boolean} isVisible Optional, determines if the child component should be visible/rendered or not. When `true`, the child component will fade in. When transitioning from `true` to `false`, the child component will fade out before being removed. If not set, the wrapper and it's child components will fade in but won't have an option to be removed/fade out.
 * @param {number | { animationInDuration: number, animationOutDuration: number }} animationDuration Optional, sets the duration for both the fade and slide animations. You also can set the animation's in and out duration lengths individually by passing an object value to this prop with the respective duration lengths.
 * @param {number} slideLength Optional, sets the slide length in pixels (how far should the wrapper slide in or out?).
 */
export default function GSAPFadeSlideWrapper({
  children,
  classNames,
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
        gsap.to(gsapWrapper.current, {
          opacity: 0,
          duration: animationInDuration,
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
            duration: animationOutDuration,
          }
        );
      }
    },
    { dependencies: [shouldRender] }
  );

  return shouldRender ? (
    <div className={classNames} style={{ opacity: 0 }} ref={gsapWrapper}>
      {children}
    </div>
  ) : null;
}
