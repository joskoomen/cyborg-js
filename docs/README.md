#  Cyborg JS

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ypa/cyborg-js)
![npm version](https://img.shields.io/npm/v/@ypa/cyborg-js)

Cyborg JS is a SEO friendly framework created with [Flow type](https://flow.org/) , specially created for Page Based Applications.

Every Cyborg JS application starts with it's `MotherBoard`. The `MotherBoard` is a `singleton` and the center of front-end communication.
Every `component` can communicate through the integrated `Notification` system.

## Garbage collection
All `components` and `views` have a `destroy` method to remove the dom element and related events.

## Register your components
Every `component` is connected to a `HTMLElement` via your web application views or html pages.

```.html
<ul class="menu" data-component="my-menu">
    <li>Menu Label</li>
    <li>Menu Label</li>
    <li>Menu Label</li>
    <li>Menu Label</li>
</ul>
```
And registered in your app with all other components in the `componentsMap`:
```.javascript

MotherBoard.getInstance().componentsMap = {
  'my-menu': MyMenuComponent,
  'my-other-component': MyOtherComponent,
};
```
Where the `key` is equal to your `data-component` value and the value is the `class` of the `component`.

## Notifications
`Notifications` are like global events. You can add and remove listeners in your `component`. Add listeners via the `notifications array` or the `addListener` method. Each Notification that's triggered will have 2 keys. `notification` and `payload`.

The following example is how to add or remove a listener, or send a notification in your javascript.
```.javascript
// inited listeners
notifications:Array<string> = ['my-inited-notification','another-inited-notification'];

// add a listener
this.addListener('my-notification');

// remove a listener
this.removeListener('my-notification');

// notify
let optionalDataObject:Object = {'foo' : bar};
this.notify('my-notification', optionalDataObject);
```
## The Component
The Component is your connection with a `HTMLElement`. It can be described as a `Component Controller`. Read more about the `Cyborg JS Component` in it's [own section](/component?id=components) . 

## Getting started
The following parts of code is enough to get started:

### App.js 
```.javascript
// @flow

import FirstComponent from './components/FirstComponent';
import AnotherComponent from './components/AnotherComponent';
import { MotherBoard } from '@ypa/cyborg-js';

class App {
  
  constructor() {
    MotherBoard.getInstance().componentsMap = {
      'first': FirstComponent,
      'another': AnotherComponent
    };
  }
}

const app = new App();
```
### FirstComponent.js 
```.javascript
// @flow

import { Component } from '@ypa/cyborg-js';

export default class FirstComponent extends Component {
  
  notifications:Array<string> = ['someChanges', 'updateSomething'];
  
  bind(pEl:HTMLElement):void {
    super.bind(pEl);
    // do some init work
  }
  
  handleNotifications(pData:Object):void {
    switch(pData.notification) {
      default:
        break;
      case 'someChanges':
        // this.render uses the getTemplate method to render
        // new data with the given template.
        this.render({'title': pData.payload.title});
        break;
      case 'updateSomething':
        this.render({'title': 'update something'});
        break;
  }
  
  getTemplate(pData:Object):string {
    return `<p>Hello ${pData.title}</p>`;
  }
}
```

### AnotherComponent.js 
```.javascript
// @flow

import { Component } from '@ypa/cyborg-js';

export default class AnotherComponent extends Component {
  
  bind(pEl:HTMLElement):void {
    super.bind(pEl);
    const handler:function = this.handleClicks.bind(this);
    // eventlisteners are for HTMLElements only
    // Components have them as well, which get registered for  
    // garbage collection. 
    // EventListeners are removed when Component is destroyed 
    this.addEventListener('click', handler);
  }
  
  handleClicks(e:MouseEvent):void {
    this.notify('someChanges', {'title':'Clicked'});
  }
  
}
```

#### HTML
```.html
    <div class="container">
        <div data-component="first">
            <!-- The data-component attribute is part where you map the Class to this HTMLElement -->
            <!-- The data-notifications is optional to add Notification Listeners comma separated -->
            <p>Hello world</p>
        </div>
        <button data-component="another">
            Click Me!
        </button>
    </div>
```
