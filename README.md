## Components

| Name                                          |                                                         Description |
| :-------------------------------------------- | ------------------------------------------------------------------: |
| [GSAPFadeWrapper](#gsapfadewrapper)           |           Attaches a fade animation to the provided child elements. |
| [GSAPFadeSlideWrapper](#gsapfadeslidewrapper) | Attaches a fade and slide animation to the provided child elements. |

## GSAPFadeWrapper

Adds a fade animation to the provided child elements.

### Textual Prop Description

The GSAPFadeWrapper serves as a container component designed to apply a fade animation to its child elements. By utilizing the `classNames` parameter, you can assign CSS classes to enhance styling. If integrated in your project, you might also use Tailwind CSS classes, for example. In the absence of a specified condition for the `isVisible` prop, the component will automatically initiate a fade-in effect for the child elements, without the possibility of a fade-out transition. The `fadeDuration` prop accommodates a number value to set identical fade-in and fade-out times, or an object containing `fadeInDuration` and `fadeOutDuration` properties, allowing for distinct durations for each phase of the fade effect.

### Table Prop Overview

| Prop           |                                  Type                                   | Required | Default | Description                                |
| :------------- | :---------------------------------------------------------------------: | :------: | :-----: | :----------------------------------------- |
| `classNames`   |                                `string`                                 |          |  `""`   | CSS classes for the wrapper itself         |
| `isVisible`    |                                `boolean`                                |          | `true`  | Render condition of the wrapped elements   |
| `fadeDuration` | `number`<br>or<br>`{ fadeInDuration: number, fadeOutDuration: number }` |          |  `0.5`  | Duration of the fade animations in seconds |

### Example

```js
<GSAPFadeWrapper
  classNames="flex flex-col bg-red-600"
  isVisible={renderCondition}
>
  <div>Include any child elements/components</div>
</GSAPFadeWrapper>
```

## GSAPFadeSlideWrapper

Quick introduction

### Textual Prop Description

...

### Table Prop Overview

| Prop                |                                          Type                                           | Required |  Default  | Description                              |
| :------------------ | :-------------------------------------------------------------------------------------: | :------: | :-------: | :--------------------------------------- |
| `classNames`        |                                        `string`                                         |          |   `""`    | CSS classes for the wrapper itself       |
| `isVisible`         |                                        `boolean`                                        |          |  `true`   | Render condition of the wrapped elements |
| `slideDirection`    | `slideDown` <br>or<br> `slideUp` <br>or<br> `slideFromRight` <br>or<br> `slideFromLeft` |          | `slideUp` | Slide direction                          |
| `animationDuration` |    `number`<br>or<br>`{ animationInDuration: number, animationOutDuration: number }`    |          |   `0.5`   | Fade & slide duration in seconds         |
| `slideLength`       |                                        `number`                                         |          |   `50`    | Slide length                             |

### Example

```js
<GSAPFadeSlideWrapper
  classNames="text-center custom_css_class"
  isVisible={renderCondition}
  slideDirection="slideDown"
  slideLength={150}
>
  <div>Include any child elements/components</div>
</GSAPFadeSlideWrapper>
```
