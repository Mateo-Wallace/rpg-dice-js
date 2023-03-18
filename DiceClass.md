---
order: 97
icon: code
---

# :icon-code: Dice(\{\}) Class

The `Dice({})` class allows you to add various settings options in order to customize your dice instance. For basic usage instructions of `Dice({})` check out [Use the Dice Class](./overview/#use-the-dice-class).

## Settings

To configure settings simply add them as an object to the `Dice` class.

**Default Settings**:
:::code source="./code/dcDefault.js" :::

Add as many or as little settings as you would like, whatever settings you don't declare will assume the default setting listed above.

### isBoldCrit

Determines if dice rolls that come out to either 1 or the highest number possible are wrapped by the `boldWrapper`. The default bold wrapper is `["**", "**"]`.

**Valid input**: `true` or `false`. For a may simple version of true or false feel free to use `1` for true and `0` for false.

**Default Value**: `false`

```
const d20 = new Dice({
    isBoldCrit: true,
})
```

### defaultDie

Determines the die rolled when there is no input.

**Valid input**: `integer`. Example: `4`, `6`, `20`, `179`

**Default value**: `20`

```
const d20 = new Dice({
    defaultDie: 6,
})
```

### boldWrapper

Determines what surrounds a die result when it is either 1 or the highest number possible. This can be used to potentially **bold** items in markdown using `["**", "**"]`, or in html using `["<strong>", "</strong>"]`.

**Valid input**: An array with two items. Position 1 is placed to the left of the number. Position 2 is placed to the right of the number. Example: `["<strong>", "</strong>"]`

**Default value**: `["**", "**"]`

```
const d20 = new Dice({
    boldWrapper: ["<strong>", "</strong>"],
})
```

### Response Options

The rest of the settings simply determine which responses are sent back when the `roll()` method is called. They are all set to true by default. This includes `ok`, `input`, `result`, `total`, `resultNoDice`, `prefab`, `inputArray`, `resultNoDiceArray`, and `totalCrit`.

**Valid input**: `true` or `false`. For a may simple version of true or false feel free to use `1` for true and `0` for false.

**Default Value**: `true`

```
const d20 = new Dice({
    resultNoDice: false,
    prefab: false,
    inputArray: false,
    resultArray: false,
    resultNoDiceArray: false,
})
```
