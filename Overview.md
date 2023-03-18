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
roll("1d20 + 5").result
```

For more in depth info see [roll() function](./rollfunction/)

## Use the Dice class

Once the `Dice` class has been imported, we must declare a variable to use as a `new Dice({})`. This will allow us to run the methods associated with our class, such as roll.

```
const d20 = new Dice({})
```

Before we move forward lets take a look at adjusting settings as thats the entire point of the class! In order to change your settings choose the setting you wish to adjust and assign it your custom value.

```
const d20 = new Dice({ isBoldCrit: true })
```

For example declaring `isBoldCrit: true` makes so if a die is rolled and the value is either 1 or the highest number available, it will wrap that number in two asterisks, `**`. Don't worry, you can also change the bold wrapper as well. For now lets continue.

Now that our `Dice` class has been declared and assigned a variable we can access its methods. The main method we will be calling is the `roll()` method!

```
d20.roll("1d20 + 5")
```

Just like the regular `roll` function, this `roll` method has all the same properties. It will return a js object that includes a bunch of data types such as the input, response, and total. In order to access a specific data type simply add the key of your data after the roll method:

```
d20.roll("1d20 + 5").result
```

For more in depth info see [Dice(\{}) Class](./diceclass/)

## Example Usage

+++ Roll
:::code source="./code/ovRollFull.js" :::
+++ Dice
:::code source="./code/ovDiceFull.js" :::
+++
