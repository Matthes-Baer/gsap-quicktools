## Components

| Name                                          |                                                          Description |
| :-------------------------------------------- | -------------------------------------------------------------------: |
| [GSAPFadeWrapper](#gsapfadewrapper)           |            Attaches a fade animation to the provided child elements. |
| [GSAPFadeSlideWrapper](#gsapfadeslidewrapper) |  Attaches a fade and slide animation to the provided child elements. |
| [GSAPScaleXWrapper](#gsapscalexwrapper)       |          Attaches a scaleX animation to the provided child elements. |
| [ScrollElement](#scrollelement)               | Enables scrolling through a scrollable element by clicking/touching. |

<!-- | [GSAPSlideWrapper](#gsapslidewrapper)         |          Attaches a slide animation to the provided child elements. | -->

## GSAPFadeWrapper

Adds a fade animation to the provided child elements.

### Table Prop Overview

| Prop           |                                  Type                                   | Default | Description                                          |
| :------------- | :---------------------------------------------------------------------: | :-----: | :--------------------------------------------------- |
| `elementType`  |                           `React.ElementType`                           |  `div`  | Optional, the wrapper's element type                 |
| `classNames`   |                                `string`                                 |  `""`   | Optional, CSS classes for the wrapper itself         |
| `isVisible`    |                                `boolean`                                | `true`  | Optional, render condition of the wrapped elements   |
| `fadeDuration` | `number`<br>or<br>`{ fadeInDuration: number, fadeOutDuration: number }` |  `0.5`  | Optional, duration of the fade animations in seconds |

Children elements/components may be included.

### Example

```js
<GSAPFadeWrapper
  elementType="p"
  classNames="flex flex-col bg-red-600"
  isVisible={renderCondition}
  fadeDuration={{ fadeInDuration: 0.5, fadeOutDuration: 1.5 }}
>
  Include any child elements/components
</GSAPFadeWrapper>
```

<!-- ## GSAPSlideWrapper

Adds a slide animation to the provided child elements

<!-- ### Textual Prop Description

...

### Table Prop Overview

| Prop | Type | Default | Description |
| :--- | :--: | :-----: | :---------- |

### Example

````js

```

-->

## GSAPFadeSlideWrapper

Adds both a fade and slide animation to the provided child elements

### Table Prop Overview

| Prop                |                                          Type                                           |  Default  | Description                                        |
| :------------------ | :-------------------------------------------------------------------------------------: | :-------: | :------------------------------------------------- |
| `elementType`       |                                   `React.ElementType`                                   |   `div`   | Optional, the wrapper's element type               |
| `classNames`        |                                        `string`                                         |   `""`    | Optional, CSS classes for the wrapper itself       |
| `isVisible`         |                                        `boolean`                                        |  `true`   | Optional, render condition of the wrapped elements |
| `slideDirection`    | `slideDown` <br>or<br> `slideUp` <br>or<br> `slideFromRight` <br>or<br> `slideFromLeft` | `slideUp` | Optional, slide direction                          |
| `slideLength`       |                                        `number`                                         |   `50`    | Optional, slide length                             |
| `animationDuration` |    `number`<br>or<br>`{ animationInDuration: number, animationOutDuration: number }`    |   `0.5`   | Optional, Fade & slide duration in seconds         |

Children elements/components may be included.

### Example

```js
<GSAPFadeSlideWrapper
  classNames="text-center custom_css_class"
  elementType="h1"
  isVisible={renderCondition}
  slideDirection="slideDown"
  animationDuration={{ animationInDuration: 0.5, animationOutDuration: 1.5 }}
  slideLength={150}
>
  This is some text!
</GSAPFadeSlideWrapper>
```

## GSAPScaleXWrapper

Adds a scaleX entering and closing animation to the provided child elements

### Table Prop Overview

| Prop                |                                       Type                                        |     Default     | Description                                        |
| :------------------ | :-------------------------------------------------------------------------------: | :-------------: | :------------------------------------------------- |
| `elementType`       |                                `React.ElementType`                                |      `div`      | Optional, the wrapper's element type               |
| `classNames`        |                                     `string`                                      |      `""`       | Optional, CSS classes for the wrapper itself       |
| `isVisible`         |                                     `boolean`                                     |     `true`      | Optional, render condition of the wrapped elements |
| `animationDuration` | `number`<br>or<br>`{ animationInDuration: number, animationOutDuration: number }` |      `0.5`      | Optional, Fade & slide duration in seconds         |
| `transformOrigin`   |                                     `string`                                      | `center center` | Optional, transformOrigin property                 |

Children elements/components may be included.

### Example

```js
<GSAPScaleXWrapper
  classNames="w-36 h-1 bg-red-800"
  isVisible={isShown}
  animationDuration={2.5}
/>
```

## ScrollElement

This component enables scrolling within a separate component or element through clicks or touches. For instance, users can navigate a list by clicking on this ScrollElement component. To enable this functionality, it's essential to link a reference (ref) to both this component and the target element intended for scrolling.

### Table Prop Overview

| Prop                |                                 Type                                  |        Default         | Description                                           |
| :------------------ | :-------------------------------------------------------------------: | :--------------------: | :---------------------------------------------------- |
| `elementType`       |                          `React.ElementType`                          |         `div`          | Optional, the component's element type                |
| `classNames`        |                               `string`                                |          `""`          | Optional, CSS classes for the component itself        |
| `scrollAmount`      |                               `number`                                |          `2`           | Optional, determines the scroll speed                 |
| `animationDuration` | `{ horizontal: "left" or "right" }` or `{ vertical: "down" or "up" }` | `{ vertical: "down" }` | Optional, sets the scroll direction                   |
| `ref`               |                    `React.RefObject<HTMLElement>`                     |                        | Required, the ref that targets the scrollable element |

Children elements/components may be included.

### Example

```js
<ScrollElement
  ref={scrollTargetRef}
  classNames="w-96 h-24 bg-red-200"
  elementType={"button"}
  scrollDirection={{ horizontal: "right" }}
  scrollAmount={4}
>
  SCROLL RIGHT
</ScrollElement>
```
