import React, { forwardRef, useRef } from "react";

interface GSAPScrollElementProps {
  children?: React.ReactNode;
  elementType?: React.ElementType;
  classNames?: string;
  scrollAmount?: number;
  scrollDirection?:
    | { horizontal: "left" | "right" }
    | { vertical: "down" | "up" };
}

/**
 * A component that enables scrolling through a target element when the user clicks or touches this component. It's designed for both mouse and touch interactions.
 *
 * @param {React.ReactNode} children - The children components to be rendered inside this component. These can be any valid React nodes, including elements, strings, numbers, or fragments.
 * @param {React.ElementType} [elementType="button"] - The type of element to be used as the container for the children. This can be any valid HTML tag name as a string (e.g., 'div', 'span', 'section') or a React component.
 * @param {string} [classNames=""] - Additional CSS class names to apply to the container element for styling purposes. This prop can accommodate classes from CSS frameworks like Tailwind CSS or Bootstrap, as well as custom styles.
 * @param {number} [scrollAmount=2] - The number of pixels the target element should scroll with each interval. This value determines the speed and distance of the scrolling. A higher value results in faster and longer scrolling.
 * @param {{ horizontal: "left" | "right" } | { vertical: "down" | "up" }} [scrollDirection={ vertical: "down" }] - The direction in which the target element will be scrolled. This prop accepts an object with either a 'horizontal' or 'vertical' key, specifying the scroll direction as 'left', 'right', 'down', or 'up'.
 * @param {React.RefObject<HTMLElement>} ref - A React ref created by `useRef` or `createRef` that points to the target element you want to scroll. This ref is used to programmatically access the target element and control its scroll behavior. When using this component you would pass the same ref to this component and the element that needs to be scrolled through.
 */
const GSAPScrollElement = forwardRef<HTMLElement, GSAPScrollElementProps>(
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
    const scrollInterval = useRef<number | null>(null);
    const verticalScrollDirection = "vertical" in scrollDirection;

    const startScrolling = (event?: React.MouseEvent) => {
      if (event?.button !== 0) return;

      const element = ref && "current" in ref ? ref.current : null;

      if (element) {
        scrollInterval.current = window.setInterval(() => {
          if (verticalScrollDirection) {
            const directionMultiplier =
              scrollDirection.vertical === "down" ? 1 : -1;
            element.scrollTop += directionMultiplier * scrollAmount;
          } else {
            const directionMultiplier =
              scrollDirection.horizontal === "right" ? 1 : -1;
            element.scrollLeft += directionMultiplier * scrollAmount;
          }
        }, 10);
      }
    };

    const stopScrolling = () => {
      if (scrollInterval.current !== null) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
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
        onTouchStart: () => startScrolling(),
        onTouchEnd: stopScrolling,
        onContextMenu: handleContextMenu,
      },
      children
    );
  }
);

export default GSAPScrollElement;
