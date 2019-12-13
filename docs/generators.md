#  Generators
To avoid copy paste or typing all over the same thing everytime, we've created a generator file with [plop.js](https://plopjs.com).
You can generate:
* Custom Component
* Custom Motherboard

## Installation
Install the Generator package (asuming you have `cyborg-js` installed.

``` .bash
yarn add @ypa/cyborg-js-generators --dev
```
or
```.bash
npm install @ypa/cyborg-js-generators --save-dev
```

## Configuration
1) Create a `plopfile.js` file in the root of your project and add the following content. Change `./your/scripts/source/path/` with the relative path to your scripts. In this folder the generated files will be added. 
```.js
module.exports = function(plop) {
  plop.load('@ypa/cyborg-js-generators', {
    sourcePath: './your/scripts/source/path/'
  });
};
```

2) In your `package.json` add a reference to `plop` a simple `plop: plop` is enough. But you can be creative and can make commands shorter. Read more [here](#scripts).


## Commands
There are a growing amount of `generators`. At this moment the following `commands` are available:

| Command           | What                                                |
|-------------------|-----------------------------------------------------|
|`make:component`   | This will make a command with a view prompts        |
|`make:motherboard` | This will make a custom motherboard with one prompt | 

`Plop` let's you skip prompts by adding them as parameter.

### make:component

| Parameter  | Type    | What                                                                |
|------------|---------|---------------------------------------------------------------------|
|`name`      | string  |The name of your component. |                                        |
|`comments`  | boolean | Want inline comments? Helpfull when you're new to Cyborg JS         |
|`statement` | list    | handleNotifications prefilled with a `switch`, `if` or no statement |
|`onload`    | boolean | Want an onload handler?                                             |
|`destroy`   | boolean | Want to override the destroy method?                                |

### make:motherboard

| Parameter  | Type    | What                                                                |
|------------|---------|---------------------------------------------------------------------|
|`name`      | string  |The name of your custom motherboard.                                  |

## Scripts
By adding a `plop` reference to your scripts all commands are runnable with `plop <your-command>`. But creating your own shortcodes are possible as well. This is the minimal setup:
```.json
    // package.json
    ...,
    "scripts" : {
        "plop": "plop"
    },
    ...
```

But we like creativity. So be creative and change it how you like:
```.json
    // package.json
    ...,
    "scripts" : {
        "mc": "plop make:component",
        "mm": "plop make:motherboard"
    },
    ...
```

In this case you can run `yarn run mc` to create a component. Even prefilling some default prompts is possible to avoid answering the same questions over and over.
after `plop make:component -- ` you can add `--prompt-name` with your value. 

```.json
    // package.json
    ...,
    "scripts" : {
        "mc": "plop make:component -- --comments false --onload true --destroy true"
    },
    ...
```

In your `make:component` command you can make prefills complete with one of the following:
- `--statement 'None'`; 
- `--statement 'Switch statement'`;
- `--statement 'If statement'` 


