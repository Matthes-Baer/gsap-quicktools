import React, { forwardRef, useRef } from "react";

interface GSAPScrollElementProps {
  children?: React.ReactNode;
  elementType?: React.ElementType;
  classNames?: string;
  scrollAmount?: number;
  scrollDirection?:
    | { horizontal: "left" | "right" }
    | { vertical: "down" | "up" };
  ref: React.RefObject<HTMLElement>;
}

/**
 * A component that enables scrolling through a target element when the user holds down the mouse on this component. This component doesn't support touch events on mobile devices out of the box. For enhanced mobile interaction, consider using libraries like Hammer.js, which offer comprehensive touch event handling capabilities.
 *
 * @param {React.ReactNode} children - Optional, the children components to be rendered inside this component. These can be any valid React nodes, including elements, strings, numbers, or fragments.
 * @param {React.ElementType} [elementType="button"] - Optional, the type of element to be used as the container for the children. This can be any valid HTML tag name as a string (e.g., 'div', 'span', 'section') or a React component.
 * @param {string} [classNames=""] - Optional, additional CSS class names to apply to the container element for styling purposes. This prop can accommodate classes from CSS frameworks like Tailwind CSS or Bootstrap, as well as custom styles.
 * @param {number} [scrollAmount=2] - Optional, the number of pixels the target element should scroll with each interval. This value determines the speed of the scrolling. A higher value results in faster scrolling.
 * @param {{ horizontal: "left" | "right" } | { vertical: "down" | "up" }} [scrollDirection={ vertical: "down" }] - Optional, the direction in which the target element will be scrolled. This prop accepts an object with either a 'horizontal' or 'vertical' key, specifying the scroll direction as 'left', 'right', 'down', or 'up'.
 * @param {React.RefObject<HTMLElement>} ref - Required (technically not, but without a connected ref nothing will happen), a React ref created by `useRef` or `createRef` that points to the target element you want to scroll. This ref is used to programmatically access the target element and control its scroll behavior. When using this component you would pass the same ref to this component and the element that needs to be scrolled through.
 */
const MouseScrollElement = forwardRef<HTMLElement, GSAPScrollElementProps>(
  (
    {
      children,
      elementType = "div",
      classNames = "",
      scrollAmount = 2,
      scrollDirection = { vertical: "down" },
    },
    ref
  ) => {
    const isScrolling = useRef(false);
    const requestID = useRef<number | null>(null);

    const scroll = () => {
      const element = ref && "current" in ref ? ref.current : null;

      if (element && isScrolling.current) {
        if ("vertical" in scrollDirection) {
          const directionMultiplier =
            scrollDirection.vertical === "down" ? 1 : -1;
          element.scrollTop += directionMultiplier * scrollAmount;
        } else {
          const directionMultiplier =
            scrollDirection.horizontal === "right" ? 1 : -1;
          element.scrollLeft += directionMultiplier * scrollAmount;
        }
        requestID.current = requestAnimationFrame(scroll);
      }
    };

    const startScrolling = (event?: React.MouseEvent) => {
      if (!event || !("button" in event) || event.button === 0) {
        if (!isScrolling.current) {
          isScrolling.current = true;
          scroll();
        }
      }
    };

    const stopScrolling = () => {
      if (isScrolling.current) {
        isScrolling.current = false;
        if (requestID.current !== null) {
          cancelAnimationFrame(requestID.current);
          requestID.current = null;
        }
      }
    };

    const handleContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
      stopScrolling();
    };

    return React.createElement(
      elementType,
      {
        className: classNames,
        onMouseDown: (event: React.MouseEvent) => startScrolling(event),
        onMouseUp: stopScrolling,
        onMouseLeave: stopScrolling,
        onContextMenu: handleContextMenu,
      },
      children
    );
  }
);

export default MouseScrollElement;
