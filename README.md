#  Cyborg JS
Cyborg JS is a SEO friendly framework created with [Flow type](https://flow.org/) , which is created for large web applications where Javascript is only for additional and functional use.

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
```

MotherBoard.getInstance().componentsMap = {
  'my-menu': MyMenuComponent,
  'my-other-coponent': MyOtherComponent,
};
```
Where the `key` is equal to your `data-component` value and the value is the `class` of the `component`.

## Notifications
`Notifications` are like global events. You can add and remove listeners in your `component`. You can add listeners via the `addListener` method or direct in your components tag like `data-notifications="my-notification"` the value can be comma separated for multiple notifications.

The following example is how to add or remove a listener, or send a notification in your javascript.
```
// add a listener
this.addListener('my-notification');

// remove a listener
this.removeListener('my-notification');

// notify
let optionalDataObject:Object = {'foo' : bar};
this.notify('my-notification', optionalDataObject);
```
## The Component
Each component has at least the following methods:
* `bind(el:HTMLElement):void` This is called when the element is binded in the DOM and ready to excelerate;
* `onload():void` In `window.onload` this gets automatically triggered;
* `handleNotifications(pData:Object):void` All notifications are handled by one method. `pData.notification` shows which notification is fired. So you know what to do next;

Other methods available in `components` and all overridable:
* `addEventListener(pEvent:string, pHandler:function):void;` EventListeners as you know them. Automatically added to the connected `HTMLElement` and are automatically cleared on `destroy`;
* `removeEventListener(pEvent:string, pHandler:function):void;` The ability to remove your eventListener whenever you need;
* `getTemplate(pData: Object): string;` A literal template string of a template when there is need of layout changes on data updates;
* `render(pData: Object): void;` Render the literal template with new data;
* `get el(): HTMLElement;` A public method to get the connected `HTMLElement` in your custom component;
* `destroy(): void;` Garbage collection;

## Upcoming updates
* Unit tests;
* Component generator (cli);
* Investigate if [Redux](https://redux.js.org) can be an advantage;
* Investigate if `.jsx` is a serious option for alternative templates;
