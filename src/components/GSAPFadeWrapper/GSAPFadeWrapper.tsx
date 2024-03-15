import React, { useRef } from "react";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface FadeDuration {
  fadeInDuration: number;
  fadeOutDuration: number;
}

interface GSAPFadeWrapperProps {
  children?: React.ReactNode;
  elementType?: React.ElementType;
  classNames?: string;
  isVisible?: boolean;
  fadeDuration?: number | FadeDuration;
}

/**
 * A wrapper component that uses GSAP for fade-in and fade-out animations.
 *
 * @param {React.ElementType} [elementType = "div"] elementType Optional, set the element type (like `h1` or `p`) that acts as the parent container for the provided child elements; `div` is the default value.
 * @param {React.ReactNode} children The child component/s that this wrapper will contain. These are the elements that will be subject to the fade in/out animations.
 * @param {string} [classNames = ""] classNames Optional, additional CSS class names to apply to the wrapper for further styling or specificity. You may use Tailwind CSS, Bootstrap or custom CSS classes depending on your application's configuration.
 * @param {boolean} [isVisible = true] isVisible Optional, determines if the child component should be visible/rendered or not. When `true`, the child component will fade in. When transitioning from `true` to `false`, the child component will fade out before being removed. If not set, the wrapper and it's child components will fade in but won't have an option to be removed/fade out.
 * @param {number | { fadeInDuration: number, fadeOutDuration: number }} [fadeDuration = 0.5] fadeDuration Optional, set the duration for both the fade in and fade out animation. You also can set the fade in and fade out duration lengths individually by passing an object value to this prop with the respective duration lengths.
 */
export default function GSAPFadeWrapper({
  children,
  elementType = "div",
  classNames = "",
  isVisible = true,
  fadeDuration = 0.5,
}: GSAPFadeWrapperProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const gsapWrapper = useRef<HTMLDivElement | null>(null);

  // Check for specific fade duration lengths
  const fadeInDuration =
    typeof fadeDuration === "number"
      ? fadeDuration
      : fadeDuration.fadeInDuration;
  const fadeOutDuration =
    typeof fadeDuration === "number"
      ? fadeDuration
      : fadeDuration.fadeOutDuration;

  useGSAP(
    () => {
      if (isVisible) {
        setShouldRender(true);
      } else if (!isVisible && shouldRender) {
        // Fades out
        gsap.to(gsapWrapper.current, {
          opacity: 0,
          duration: fadeOutDuration,
          onComplete: () => setShouldRender(false),
        });
      }
    },
    { dependencies: [isVisible] }
  );

  useGSAP(
    () => {
      if (isVisible && shouldRender) {
        // Fades in
        gsap.fromTo(
          gsapWrapper.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: fadeInDuration,
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
