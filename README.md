HighFitText.js
==============

A jQuery Plugin for auto adjust the font-size to fill container

- using binary saerch

## How to use

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="jquery.highfittext.js"></script>
<script>
  jQuery('h1').highFitText();
</script>
```

## Params
The following parameter you can add

`maxFontSize` maximal font size in pixel

`minFontSize` minimal font size in pixel

`sufficeAbsRange` tolerance in pixel of the width differs to the container width

`maxWidth` the width that is optimal (default: parent container width)

If you want more exact fitting text: check out [BigText](https://github.com/zachleat/BigText) by Zach Leatherman.

