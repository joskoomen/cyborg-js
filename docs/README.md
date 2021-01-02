# Cyborg JS

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ypa/cyborg-js)
![npm version](https://img.shields.io/npm/v/@ypa/cyborg-js)

## Introduction

`CyborgJS` created to be a modern SEO friendly framework for Page Based Applications and an alternative for reactive frameworks like ReactJS and VueJS. `CyborgJS` is totally written in and for TypeScript projects. With `CyborgJS` you can finally structure your Javascript in your Page Based project.

## Core structure

<div class="half first-part">
<code>CyborgJS</code> comes with 3 main types:
<ul>
<li>The <code>MotherBoard</code>
<ul>
<li>This is your Cyborg entry point;</li>
<li>It's mandatory;</li>
<li>It's a singletond;</li>
<li>It's the center of CyborgJS;</li>
<li>See this as the application Controller</li>
</ul>
<li>The <code>NotificationController</code></li>
<ul>
<li>This manages all notifications;</li>
<li>`Notifications` are global Events that runs through one controller.</li>
<li>`Notifications` are optional.</li>
<li>`Notifications` are global Events that runs through one controller.</li>
</ul>
<li>A <code>Component</code></li>
<ul>
<li>This connects your script to a <code>HTMLElement</code> on your page;</li>
<li>You can't use CyborgJS without the use of <code>Components</code>.</li>
<li>See a <code>Component</code> as a View</li>
<li><code>Components</code> are managed by the `MotherBoard`</li>
<li><code>Components</code> can subscribe to `Notifications`</li>
</ul>
</ul>
</div>
<div class="half second-part">
<img src="/images/structure.png" alt="CyborgJS application" style="max-width:100%;"/>
</div>

## Page lifecycle

<div class="one-thirth first-part">
The <code>CyborgJS</code> Component follows the page life cycle. So for the relevant <code>window</code> events and the <code>DOMContentLoaded</code> event there is a referring method inside your <code>Component</code>.<br/><br/>

| Method     | Event                       |
| ---------- | --------------------------- |
| `bind`     | `document.DOMContentLoaded` |
| `onload`   | `window.onload`             |
| `onunload` | `window.onunload`           |
| `destroy`  | `window.onbeforeunload`     |

</div>
<div class="two-thirth second-part">
<img src="/images/page-cycle.png" alt="CyborgJS page lifecycle" style="max-width:100%;"/>
</div>

## Getting started

To get started there are 9 steps to take.

1. Create your (TypeScript) project;
2. Add `CyborgJS` to your project with `yarn add @ypa/cyborg-js` or `npm i @ypa/cyborg-js`;
3. Create an Application file (`app.ts`);
4. Add the following code in there:

```.typescript
import { MotherBoard } from "@ypa/cyborg-js";

// the components map. Here you register the Component files to the mapped HTMLElement.
const map: Record<string, any> = {};

class App {
    static init(): void {
        // add the map object to the MotherBoard (this will start the everything)
        // your app.ts file will be your index file
        MotherBoard.getInstance().componentsMap = map;
    }
}

// And go...
App.init();

```

5. Inside your project create a folder called `components`
6. Create a file in there called `MyFirstComponent.ts` and that's your first `Component`;
7. Add the following code to get started

```.typescript
import { Component } from "@ypa/cyborg-js";

export default class MyFirstComponent extends Component {

    bind(pEl:HTMLElement): void {
        super.bind(pEl);

        // your code starts here.MyFirstComponent
    }
}

```

8. Add your newly created `Component` to the Applications ComponentsMap to register it in only 2 small steps;
   1. Inside your app.js find the `map` record and replace the `{}` with `{'my-first-component' : MyFirstComponent}`;
   2. Import the Component inside your `app.ts` file `import MyFirstComponent from "./components/MyFirstComponent";`;
9. Add your newly created `Component` to your html code also in 2 small steps;
   1. Find or create your `index.html` or other Page Based File.
   2. Connect the `Component` by adding the component data attribute `data-component="my-first-component"`.
10. **Optional** Install the generators package to create all your `Components` with the command line. [Read how](/generators?id=generators).

<blockquote><strong>Did you notice that the <code>data-component</code> value for each component is equal to the key added to your <code>map</code> object in your <code>app.ts</code>? This is needed to map your <code>class</code> to the <code>HTMLElement</code>. Otherwise it won't work;</strong></blockquote>
