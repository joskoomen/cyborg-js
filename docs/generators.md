# Generators

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ypa/cyborg-js-generators)
![npm version](https://img.shields.io/npm/v/@ypa/cyborg-js-generators)

To avoid copy paste or typing all over the same thing everytime, we've created a generator file with [plop.js](https://plopjs.com).
You can generate:

- Custom Component
- App File
- Notifications Enum File

## Getting started

Install the Generator package

`yarn add @ypa/cyborg-js-generators --dev` or `npm i @ypa/cyborg-js-generators -d`

## Configuration

1. Create a `plopfile.js` file in the root of your project and add the following content. Change `./your/scripts/source/path/` with the relative path to your scripts. In this folder the generated files will be added.

```.javascript
module.exports = function(plop) {
  plop.load('@ypa/cyborg-js-generators', {
    sourcePath: './your/scripts/source/path/'
  });
};
```

2. In your `package.json` add a reference to `plop` a simple `plop: plop` is enough. But you can be creative and can make commands shorter. Read more [here](#scripts).

## Commands

There are a growing amount of `generators`. At this moment the following `commands` are available:

| Command              | What                                                      |
| -------------------- | --------------------------------------------------------- |
| `make:component`     | This will make a component with a few prompts             |
| `make:app`           | This will make an App class with one prompt               |
| `make:notifications` | This will create an Notifcations Enum fle with one prompt |

### make:component command

`plop make:component` will create a `Component` based on some questions inside a `components` folder, which is located in your `sourcePath`:

| Prompt      | Type    | What                                                                |
| ----------- | ------- | ------------------------------------------------------------------- |
| `name`      | string  | The name of your component.                                         |
| `comments`  | boolean | Want inline comments? Helpfull when you're new to CyborgJS          |
| `statement` | list    | handleNotifications prefilled with a `switch`, `if` or no statement |
| `onload`    | boolean | Want an onload handler? `                                           |
| `onunload`  | boolean | Want an onunload handler? `                                         |
| `destroy`   | boolean | Want to override the destroy method?                                |

### make:app command

`plop make:app` will create an `App` file in the root of your given `sourcePath`. This `command` does not have any `prompts`.

### make:notifications command

`plop make:notifications` will create a `Notifications` enum file in the root of your given `sourcePath`:.

| Prompt     | Type    | What                                                       |
| ---------- | ------- | ---------------------------------------------------------- |
| `name`     | string  | The name of your First Notification.                       |
| `comments` | boolean | Want inline comments? Helpfull when you're new to CyborgJS |

### Bypassing prompts

You can skip some of the questions by adding prefilled prompts.
For example skipping the comments prompt in the `make:component` command you can add `-- --comments false` to your command. Like this: `plop make:component -- --comments false`;
More info on skipping prompts read the [Plop documentation](https://plopjs.com/documentation/#bypassing-prompts-by-name-).

## Add as npm script

### Minimal setup

By adding a `plop` reference to your scripts all commands are runnable with `plop <your-command>`. But creating your own shortcodes are possible as well:

```.json
    // package.json
    ...,
    "scripts" : {
        "plop": "plop"
    },
    ...
```

### More advanced setup

Be creative and change the `scripts` how you like it:

```.json
    // package.json
    ...,
    "scripts" : {
        "mc": "plop make:component",
    },
    ...
```

Now you can run `yarn run mc` to create a `Component`.

### Bypassing prompts

Bypassing prompts are still possible ;)

```.json
    // package.json
    ...,
    "scripts" : {
        "mc": "plop make:component -- --comments false --onload true --destroy true"
    },
    ...
```

<blockquote>To bypass the `statement` prompt in your `make:component` command you can add one of the following parts in your command:
<code>
--statement 'None' 
--statement 'Switch statement'
--statement 'If statement'
</code>
</blockquote>
