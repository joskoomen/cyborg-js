#  Notifications
A Cyborg JS `Notification` is created when sending a `notification`. Each `Notification` is an Object that will have 2 keys at any time.

``` .js
let data:Object = {
    notification:string,
    payload:Object
}
```

## Notifications cycle
The Notification cycle starts with the `notify` method you can send. This method will have 2 parameters, your notification string, and your optional payload object.
When you don't add a `payload` object, this Object is always empty. 

## NotificationController
The notification controller is connected in every `Component` through the ` [MotherBoard](/motherboard) ` component and you probably never use this. The `NotificationController` is a `singleton` class.
It keeps track of registered notifications, so it also remove notifcations in the garbage collection cycle. 
