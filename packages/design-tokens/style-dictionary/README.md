# Inspiration and Setup

The setup uses
[Amazon Style Dictionary](https://amzn.github.io/style-dictionary/#/)
and is inspired by
[Adobe Spectrum](https://spectrum.adobe.com/page/design-tokens/),
[Atlassian Design Tokens](https://www.slideshare.net/SarahFederman/customizability-in-design-systems),
[Cosmos Design System](https://didoo.medium.com/how-to-manage-your-design-tokens-with-style-dictionary-98c795b938aa) &
[DTCG](https://github.com/design-tokens/community-group)

# Prerequisites

```bash
yarn install
```

# Commands
Build all platforms from tokens defined in `src/tokens/**/*.json`:

```bash
yarn build
```

This will output `dist`folder with the generated styles.

# Types of Tokens

There a 3 different types of tokens  `Global Tokens`, `Alias Tokens`, `Component Tokens`.

# Global Tokens

Global Tokens define all base categories:

* border
* border-radius
* breakpoints (not implemented yet)
* color
* font-family
* font-weight
* opacity
* shadow
* size
* spacing

Global Tokens contain ALL possible values. 
Therefore, only Global Tokens contain raw values like numbers, strings. 
Every other token is based on another token.

Global Tokens are defined in `src/tokens/globals/*.json`.

# Platforms

In Style Dictionary a platform defines all the operations from a given input (`*.json`) to an output (e.g `scss`-variables). 

The most interesting operations are `Transforms` and `Formatting`

## Transforms

Style Dictionary supports three different types of transforms `name`,`value` & `attribute`:

### name

With the `name`-Transform you can modify how your token should be named, e.g. `kebab-case` or `CONSTANT_CASE`.
You can also use it for more complex namings.


```xml
<!-- font_dimens.xml -->
<resources>
  <dimen name="size_font_small">12.00sp</dimen>
  <dimen name="size_font_medium">16.00sp</dimen>
  <dimen name="size_font_large">32.00sp</dimen>
  <dimen name="size_font_base">16.00sp</dimen>
</resources>

<!-- colors.xml -->
<resources>
  <color name="color_base_gray_light">#ffcccccc</color>
  <color name="color_base_gray_medium">#ff999999</color>
  <color name="color_base_gray_dark">#ff111111</color>
  <color name="color_base_red">#ffff0000</color>
  <color name="color_base_green">#ff00ff00</color>
  <color name="color_font_base">#ffff0000</color>
  <color name="color_font_secondary">#ff00ff00</color>
  <color name="color_font_tertiary">#ffcccccc</color>
</resources>
```

## Compose

```kotlin
object StyleDictionaryColor {
  val colorBaseGrayDark = Color(0xff111111)
  val colorBaseGrayLight = Color(0xffcccccc)
  val colorBaseGrayMedium = Color(0xff999999)
  val colorBaseGreen = Color(0xff00ff00)
  val colorBaseRed = Color(0xffff0000)
  val colorFontBase = Color(0xffff0000)
  val colorFontSecondary = Color(0xff00ff00)
  val colorFontTertiary = Color(0xffcccccc)
}

object StyleDictionarySize {
  /** the base size of the font */
  val sizeFontBase = 16.00.sp
  /** the large size of the font */
  val sizeFontLarge = 32.00.sp
  /** the medium size of the font */
  val sizeFontMedium = 16.00.sp
  /** the small size of the font */
  val sizeFontSmall = 12.00.sp
}
```

## SCSS

```scss
// variables.scss
$color-base-gray-light: #cccccc;
$color-base-gray-medium: #999999;
$color-base-gray-dark: #111111;
$color-base-red: #ff0000;
$color-base-green: #00ff00;
$color-font-base: #ff0000;
$color-font-secondary: #00ff00;
$color-font-tertiary: #cccccc;
$size-font-small: 0.75rem;
$size-font-medium: 1rem;
$size-font-large: 2rem;
$size-font-base: 1rem;
```

## iOS

```objc
#import "StyleDictionaryColor.h"

@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:0.800f green:0.800f blue:0.800f alpha:1.000f],
[UIColor colorWithRed:0.600f green:0.600f blue:0.600f alpha:1.000f],
[UIColor colorWithRed:0.067f green:0.067f blue:0.067f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.800f green:0.800f blue:0.800f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
```

Pretty nifty! This shows a few things happening:

1. The build system does a deep merge of all the token JSON files defined in the `source` attribute of `config.json`.
   This allows you to split up the token JSON files however you want.
   There are 2 JSON files with `color` as the top level key, but they get merged properly.
2. The build system resolves references to other design tokens. `{size.font.medium.value}` gets resolved properly.
3. The build system handles references to token values in other files as well as you can see in `tokens/color/font.json`.

Now let's make a change and see how that affects things. Open up `tokens/color/base.json` and change `"#111111"` to `"#000000"`.
After you make that change, save the file and re-run the build command `style-dictionary build`. Open up the build files and take a look.

**Huzzah!**

Now go forth and create! Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).
