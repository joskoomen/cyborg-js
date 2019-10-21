#  Cyborg JS
Cyborg JS is a SEO friendly framework created with [Flow type](https://flow.org/) , which is created for large web applications where Javascript is only for additional and functional use.

## Links
- [Documentation](https://cyborg-js.org)
- [CLI](https://github.com/your-personal-agency/cyborg-js-generators)
- [Issues](https://github.com/your-personal-agency/cyborg-js/issues)
- [Community chat](https://gitter.im/cyborg-js/community)

To use Cyborg JS in your application you need to create a `MotherBoard instance`. The `MotherBoard` is a `singleton` and the center of your application.
Every `component` can communicate through `Notifications` and all `components` are created, and removed via the `MotherBoard`. Once you registered your `component`, everything is automated.

## Garbage collection
All components have a `destroy` method which will remove eventlisteners and can be extended to do everything once it's removed from your DOM.

## Register your components
Every component is added to a `HTMLElement` via your web application views or html pages.

```
<ul class="menu" data-component="my-menu">
    <li>Menu Label</li>
    <li>Menu Label</li>
    <li>Menu Label</li>
    <li>Menu Label</li>
</ul>
```
And registered in your app with all other components in the `componentsMap`:
```.js

MotherBoard.getInstance().componentsMap = {
  'my-menu': MyMenuComponent,
  'my-other-component': MyOtherComponent,
};
```
Where the `key` is equal to your `data-component` value and the value is the `class` of the `component`.

## Notifications
`Notifications` are like global events. You can add and remove listeners in your `component`. You can add listeners via the `addListener` method or direct in your components tag like `data-notifications="my-notification"` the value can be comma separated for multiple notifications.

The following example is how to add or remove a listener, or send a notification in your javascript.
```.js
// add a listener
this.addListener('my-notification');

// remove a listener
this.removeListener('my-notification');

// notify
let optionalDataObject:Object = {'foo' : bar};
this.notify('my-notification', optionalDataObject);
```
## The Component
The Component is your connection with your `HTMLElements`. It can be described as a `ViewController`. Read more about the `Cyborg JS Component` in it's [own section](https://cyborg-js.org/#/component?id=components) . 

## Getting started
The following parts of code is enough to get started:

### App.js 
```.js
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
```.js
// @flow
import { Component } from '@ypa/cyborg-js';

export default class FirstComponent extends Component {
  
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
        this.render({'title': pData.title});
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
```.js
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
```
    <div class="container">
        <div data-component="first" data-notifications="someChanges,updateSomething">
            <!-- The data-component attribute is part where you map the Class to this HTMLElement -->
            <!-- The data-notifications is optional to add Notification Listeners comma separated -->
            <p>Hello world</p>
        </div>
        <button data-component="another">
            Click Me!
        </button>
    </div>
```

## Upcoming updates
* Unit tests;
* Investigate if [Redux](https://redux.js.org) can be an advantage;
* Investigate if `.jsx` is a serious option for alternative templates;
