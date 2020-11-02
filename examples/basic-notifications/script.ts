import { Component, MotherBoard, NotificationBody } from "../../dist/cyborg-js";

class Product extends Component {

    bind(pEl: HTMLElement): void {
        super.bind(pEl);


        this.addEventListener('click', () => {
            // notify is to send a notification, 
            // it includes a string(the notification)
            // and an optional object with data
            this.notify('add-to-cart', { count: 2 });
        });
    }
}

class CartCount extends Component {

    protected _notifications: ReadonlyArray<string> = [
        'add-to-cart'
    ]

    handleNotifications(pData: NotificationBody): void {
        // handing a notification includes a NotificationBody type
        // this includes a notification (string)
        // and a payload object (with the parameters sent)
        const { notification, payload } = pData;

        if (notification === 'add-to-cart') {
            this.el.innerText = payload.count;
        }
    }
}

class Application {

    constructor() {

        // map the data-component value to a class
        const map: Record<string, any> = {
            'cart-count' : CartCount,
            'product' : Product,
        }

        // register the map to start.. that's all
        MotherBoard.getInstance().componentsMap = map;
    }
}

