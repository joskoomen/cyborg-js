#  Views
A Cyborg JS `View` is a class connected to any `HTMLElement` in your `DOM`. Views are connected as `data attribute`. A `View` is only used to quickly update 

```.html
<div data-view="my-view"></div>
``````
## Life cycle
Since CyborgJS is made to work on PBA's. A Component lifecycle runs within your page.

| Method  | Event                              |
|---------|------------------------------------|
|`bind`   |`document.DOMContentLoaded`         |
|`onload` |`window.onload`                     | 
|`destroy`|`window.onbeforeunload` or `element.DOMNodeRemovedFromDocument`||

## All Methods
| Method                                                        | Description |
|---------------------------------------------------------------|-------------|
| `bind(el:HTMLElement):void`                                   | This is called when the element is binded in the DOM and ready to excelerate |
| `handleNotifications(pData:Object):void`                      | All notifications are handled by one method. `pData.notification` shows which notification is fired. So you know what to do next |
| `attr(pName: string, pValue: string): void`                   | Update an attribute value of your element |
| `text(pValue: string): void`                                  | Set `innerText` of your element |
| `html(pValue: string): void`                                  | Set `innerHTML` of your element |
| `addClass(pName: string): void`                               | Add a class to your element |
| `removeClass(pName: string): void`                               | Removes a class from your element |
| `toggleClass(pName: string): void`                               | Toggle a class in your element |
| `destroy(): void;`                                            |  Garbage collection |
