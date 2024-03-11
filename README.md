## Components

| Name                                          |                                                         Description |
| :-------------------------------------------- | ------------------------------------------------------------------: |
| [GSAPFadeWrapper](#gsapfadewrapper)           |           Attaches a fade animation to the provided child elements. |
| [GSAPFadeSlideWrapper](#gsapfadeslidewrapper) | Attaches a fade and slide animation to the provided child elements. |

## GSAPFadeWrapper

Quick description...

| Prop           |                                  Type                                   | Required | Default | Description                                |
| :------------- | :---------------------------------------------------------------------: | :------: | :-----: | :----------------------------------------- |
| `classNames`   |                                `string`                                 |    ✓     |         | CSS classes for the wrapper itself         |
| `isVisible`    |                                `boolean`                                |          | `true`  | Render condition of the wrapped elements   |
| `fadeDuration` | `number`<br>or<br>`{ fadeInDuration: number, fadeOutDuration: number }` |          |  `0.5`  | duration of the fade animations in seconds |

Code Example...

## GSAPFadeSlideWrapper
