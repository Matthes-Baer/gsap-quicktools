## Components

| Name                                          |                                                         Description |
| :-------------------------------------------- | ------------------------------------------------------------------: |
| [GSAPFadeWrapper](#gsapfadewrapper)           |           Attaches a fade animation to the provided child elements. |
| [GSAPSlideWrapper](#gsapslidewrapper)         |          Attaches a slide animation to the provided child elements. |
| [GSAPFadeSlideWrapper](#gsapfadeslidewrapper) | Attaches a fade and slide animation to the provided child elements. |
| [GSAPScaleXWrapper](#gsapscalexwrapper)       |         Attaches a scaleX animation to the provided child elements. |

## GSAPFadeWrapper

Adds a fade animation to the provided child elements.

<!-- ### Textual Prop Description

The GSAPFadeWrapper serves as a container component designed to apply a fade animation to its child elements. By utilizing the `classNames` parameter, you can assign CSS classes to enhance styling. If integrated in your project, you might also use Tailwind CSS classes, for example. In the absence of a specified condition for the `isVisible` prop, the component will automatically initiate a fade-in effect for the child elements, without the possibility of a fade-out transition. The `fadeDuration` prop accommodates a number value to set identical fade-in and fade-out times, or an object containing `fadeInDuration` and `fadeOutDuration` properties, allowing for distinct durations for each phase of the fade effect. -->

### Table Prop Overview

| Prop           |                                  Type                                   | Default | Description                                          |
| :------------- | :---------------------------------------------------------------------: | :-----: | :--------------------------------------------------- |
| `elementType`  |                           `React.ElementType`                           |  `div`  | Optional, the wrapper's element type                 |
| `classNames`   |                                `string`                                 |  `""`   | Optional, CSS classes for the wrapper itself         |
| `isVisible`    |                                `boolean`                                | `true`  | Optional, render condition of the wrapped elements   |
| `fadeDuration` | `number`<br>or<br>`{ fadeInDuration: number, fadeOutDuration: number }` |  `0.5`  | Optional, duration of the fade animations in seconds |

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

## GSAPSlideWrapper

Adds a slide animation to the provided child elements

<!-- ### Textual Prop Description

... -->

### Table Prop Overview

| Prop | Type | Default | Description |
| :--- | :--: | :-----: | :---------- |

### Example

```js

```

## GSAPFadeSlideWrapper

Adds both a fade and slide animation to the provided child elements

<!-- ### Textual Prop Description

... -->

### Table Prop Overview

| Prop                |                                          Type                                           |  Default  | Description                                        |
| :------------------ | :-------------------------------------------------------------------------------------: | :-------: | :------------------------------------------------- |
| `elementType`       |                                   `React.ElementType`                                   |   `div`   | Optional, the wrapper's element type               |
| `classNames`        |                                        `string`                                         |   `""`    | Optional, CSS classes for the wrapper itself       |
| `isVisible`         |                                        `boolean`                                        |  `true`   | Optional, render condition of the wrapped elements |
| `slideDirection`    | `slideDown` <br>or<br> `slideUp` <br>or<br> `slideFromRight` <br>or<br> `slideFromLeft` | `slideUp` | Optional, slide direction                          |
| `slideLength`       |                                        `number`                                         |   `50`    | Optional, slide length                             |
| `animationDuration` |    `number`<br>or<br>`{ animationInDuration: number, animationOutDuration: number }`    |   `0.5`   | Optional, Fade & slide duration in seconds         |

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

<!-- ### Textual Prop Description

... -->

### Table Prop Overview

| Prop                |                                       Type                                        |     Default     | Description                                        |
| :------------------ | :-------------------------------------------------------------------------------: | :-------------: | :------------------------------------------------- |
| `elementType`       |                                `React.ElementType`                                |      `div`      | Optional, the wrapper's element type               |
| `classNames`        |                                     `string`                                      |      `""`       | Optional, CSS classes for the wrapper itself       |
| `isVisible`         |                                     `boolean`                                     |     `true`      | Optional, render condition of the wrapped elements |
| `animationDuration` | `number`<br>or<br>`{ animationInDuration: number, animationOutDuration: number }` |      `0.5`      | Optional, Fade & slide duration in seconds         |
| `transformOrigin`   |                                     `string`                                      | `center center` | Optional, transformOrigin property                 |

### Example

```js
<GSAPScaleXWrapper
  classNames="w-36 h-1 bg-red-800"
  isVisible={isShown}
  animationDuration={2.5}
/>
```
