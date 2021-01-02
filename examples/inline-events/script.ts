import { Component, MotherBoard } from "../../dist/cyborg-js";

class Label extends Component {

    private _input: HTMLInputElement | null = null;
    private _texts: ReadonlyArray<string> = [
        'Hello',
        'Bonjour',
        'Haj',
        'Hoi',
        'G\'Day',
        'Buongiorno'
    ];
    
    bind(pEl: HTMLElement): void {
        super.bind(pEl);
        this._input = pEl.querySelector('input') as HTMLInputElement;
        
    }

    doClickButton(e: MouseEvent): void {
        this._input.value = this._texts[Math.floor(Math.random() * this._texts.length)];
    }
}

class Application {

    constructor() {

        // map the data-component value to a class
        const map: Record<string, any> = {
            'label' : Label
        }

        // register the map to start.. that's all
        MotherBoard.getInstance().componentsMap = map;
    }
}

