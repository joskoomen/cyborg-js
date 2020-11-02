import { Component, MotherBoard } from "../../dist/cyborg-js";

class HelloWorld extends Component {

    /**
     * bind is the moment your component's element is available in the DOM
     * @param pEl 
     */
    bind(pEl: HTMLElement) {
        super.bind(pEl);
        console.log('bind', pEl);
    }

    /**
     * window.onload handler
     */
    onload(): void{
        console.log('window.onload', this.el);
    }

    /**
     * window.onunload handler
     */
    onunload(): void{
        console.log('window.onunload', this.el);
    }

    /**
     * destroy is your moment to clean up the component on page transition
     */
    destroy(): void{
        // we do some garbage collection on the moments:
        // - when your element is removed
        // - or when you leave the page. (window.)
        // A lot is done automatically. But you can kill custom 
        console.log('destroy', this.el);
        super.destroy();
    }
}

class Application {

    constructor() {

        // map the data-component value to a class
        const map: Record<string, any> = {
            'hello-world' : HelloWorld
        }

        // register the map to start.. that's all
        MotherBoard.getInstance().componentsMap = map;
    }
}

