---
order: 99
icon: rocket
---

# :icon-rocket: Quick Start

## Download the package to your project

Navigate to your projects root directory and open the console. From the command line run:

```
npm i @mateo-wallace/rpg-dice-js
```

## Require rpg-dice-js and call the roll() function

Once you have the package installed locally simply require the package along with the roll function and type an input.

:::code source="./code/quickStart.js" :::

Just using roll responds with an object of various response keys. In order to target a specific key instead of simpling using `roll("1d20")` use `roll("1d20").key` where `key` is the name of the object key you wish to access.

### Output

Example outputs of using `console.log()` on the `object` and `result` variables

+++ Object output
:::code source="./code/qsObj.json" :::
+++ Result output
:::code source="./code/qsRes.json" :::
+++

## More Info

For more in depth information on the `roll()` function or for information on how to use the `Dice({})` class to customize the dice roller, continue reading.

[roll() function](./rollfunction/)

[Dice(\{}) Class](./diceclass/)
