---
order: 98
icon: globe
---

# :icon-globe: Overview

rpg-dice-js has two importable items. Thats the `Dice` class and the `roll` function. The `Dice` class is meant to allow users customization options to suit the needs of their code. The `roll` function is the an instance of the Dice class with all the default customization options turned on.

## Import your item

In order to use either items you must first either `import` or `require` them into your code. Such as the following:

+++ Roll
:::code source="./code/ovRoll.js" :::
+++ Dice
:::code source="./code/ovDice.js" :::
+++ Both
:::code source="./code/ovBoth.js" :::
+++

## Use the Roll function

Once `roll` has been imported, it is fully ready to go out of the box. `roll` was designed to be as straighforward as possible for the basic use case. To call the `roll` function in your code simply add parentheses and a user input!

```
roll("1d20 + 5")
```

This will return a js object that includes a bunch of data types such as the input, response, and total. In order to access a specific data type simply add the key of your data after the roll function:

```
roll("1d20 + 5").response
```

For more in depth info see [roll()]()

## Use the Dice class
