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
 * A wrapper component that uses GSAP for an fade-in and fade-out animation.
 *
 * @param {React.ReactNode} children - Optional, the children components to be rendered inside this component. These can be any valid React nodes, including elements, strings, numbers, or fragments.
 * @param {React.ElementType} [elementType = "div"] - Optional, the type of element to be used as the container for the children. This can be any valid HTML tag name as a string (e.g., 'div', 'span', 'section') or a React component.
 * @param {string} [classNames = ""] - Optional, additional CSS class names to apply to the container element for styling purposes. This prop can accommodate classes from CSS frameworks like Tailwind CSS or Bootstrap, as well as custom styles.
 * @param {boolean} [isVisible = true] - Optional, determines if the children components should be rendered or not. When `true`, the children components will fade in. When transitioning from `true` to `false`, the children components will fade out before being removed. If not set, the wrapper and it's children components will enter but won't have an option to be removed.
 * @param {number | { fadeInDuration: number, fadeOutDuration: number }} [fadeDuration = 0.5] Optional, sets the duration for the in and out animations. You can also set the animation's in and out duration lengths individually by passing an object with the respective duration lengths.
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
