#  Components
A Cyborg JS `Component` is a class connected to any `HTMLElement` in your `DOM`. Components are connected as `data attribute`. 

```.html
<div data-component="my-component"></div>
```

## Multiple Components
To use recurring functionalities across multiple components you can extend a `Component Class`. But in some occasions you may want to add multiple components to one `HTMLElement`.
This is possible to add comma separated component references in your data attribute.  

```.html
<div data-component="my-component,second-component"></div>
```

## RenderObject
Since Cyborg JS 2 is introduced we added The `RenderObject` as type in the `render` method. The `RenderObject`  includes 2 keys: `data` and `template`. 
`template` is an optional `callback` function which returns a literal template. By default the `getTemplate` method is used for rendering.

## Life cycle
Since CyborgJS is made to work on PBA's. A Component lifecycle runs within your page.

| Method  | Event                              |
|---------|------------------------------------|
|`bind`   |`document.DOMContentLoaded`         |
|`onload` |`window.onload`                     | 
|`destroy`|`window.onbeforeunload` or `element.DOMNodeRemovedFromDocument`||

## All Methods
| Method                                                        | Description |
|---------------------------------------------------------------|----|
| `bind(el:HTMLElement):void`                                   | This is called when the element is binded in the DOM and ready to excelerate |
| `onload():void`                                               | This is called when the page is totally loaded |
| `handleNotifications(pData:Object):void`                      | All notifications are handled by one method. `pData.notification` shows which notification is fired. So you know what to do next |
| `addEventListener(pEvent:string, pHandler:function):void;`    | EventListeners as you know them. Automatically added to the connected `HTMLElement` and are automatically cleared on `destroy` |
| `removeEventListener(pEvent:string, pHandler:function):void;` | The ability to remove your eventListener whenever you need |
| `getTemplate(pData: Object): string;`                         | The default literal template string of a template when there is need of layout changes on data updates |
| `render(pData: RenderObject): void;`                          | Render the literal template with new data; |
| `get el(): HTMLElement;`                                      | A public reference to your connected `HTMLElement` in your component |
| `destroy(): void;`                                            |  Garbage collection |

## Boilerplate
There is a Boilerplate `gist`, get it [here](https://gist.github.com/joskoomen/4f20ee21a574ad10bce26f5ad9171f5d). We recommend to use the [generators](/Generators) to create your `Component` 
