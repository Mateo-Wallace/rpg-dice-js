---
order: 98
icon: code
---

# :icon-code: roll() function

The `roll()` function is a rpg dice roller that allows for various user inputs and responds with an object of data. For basic usage instructions of `roll` check out [Use the Roll function](./overview/#use-the-roll-function).

## Calling the roll() function

When calling the `roll` function there are two way to do it. Either by passing the function nothing, or a string. If an empty string is passed it will count as nothing as well.

+++ No Input

```
roll()
```

+++ String Input

```
roll("1d20 + 5")
```

+++

## Valid Inputs

|               **Input Type**               | **Example Input** { class="compact" } |
| :----------------------------------------: | :-----------------------------------: |
|        No input: rolls default die         |            ` ` or nothing             |
| Dice: `number of dice` d `number of sides` |         `1d20`, `2d6`, `7d23`         |
|         Dice: d `number of sides`          |                 `d20`                 |
|     Math Operators: `+`, `-`, `*`, `/`     |           `1 + 1`, `1 * 1`            |
|       Capital or Lower case: d or D        |          `"1D20"`, `"1d20"`           |
|                  Numbers                   |            `5`, `13`, `1`             |
|     Spaces: no spaces & spaces allowed     | `1d20 + 1`, `1d20+1`, `1d20+1 + 1- 1` |

### Example Inputs

```
5 - d6 +4D10*2d2
1d20
2d6 + 5
1d20+4*2
```

## Output

Calling the roll function will respond with an object with various data types. Like this one:

+++ Object output
:::code source="./code/qsObj.json" :::
+++ Result output
:::code source="./code/qsRes.json" :::
+++

|   **Object Item**   |     **Access Object**      |                                                                             **Description** { class="compact" }                                                                             |
| :-----------------: | :------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|        `ok`         |        `roll().ok`         |                                                        Tracks if the roll went through ok. A good value to track for if statements.                                                         |
|       `input`       |       `roll().input`       |                                         Responds with a formatted version of the user input. Normalizes spacing and turns all letters to lowercase.                                         |
|      `result`       |      `roll().result`       |                                   Result responds with the user input plus the result of each die rolled. So for `1d20` it would respond with `1d20 (8)`.                                   |
|       `total`       |       `roll().total`       |                             Does math on all provided user input in order to provide a total. For example, `1d20 (8) + 5` would mean `8 + 5` which equals `13`.                             |
|   `resultNoDice`    |   `roll().resultNoDice`    |                               Provides the result string but without the dice included. So instead of responding with `1d20 (8)` it would respond with `(8)`.                               |
|      `prefab`       |      `roll().prefab`       |              Responds with a prefabricated message that includes the input, result, and total. The easiest response to use if you don't wish to format the response yourself.               |
|    `inputArray`     |    `roll().inputArray`     | Responds with the user input but as an array. Allowing you to access specific positions in the array to track. For example if you wanted to check what the first input a user typed in was. |
|    `resultArray`    |    `roll().resultArray`    |                               Responds with the user input plus all die rolled, in an array. Allowing you to access specific positions in the array to track.                               |
| `resultNoDiceArray` | `roll().resultNoDiceArray` |                                                                   Provides the resultArray but without the dice included.                                                                   |
|     `totalCrit`     |     `roll().totalCrit`     |                Does math on all user input but doubles the value of all dice rolls. For example, the result `1d20 (8) + 5` as a crit would be `8 * 2 + 5` which equals `21`.                |
