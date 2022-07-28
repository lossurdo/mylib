import { v4 as uuid } from "uuid"

export default class MyLib {

    mainDiv: HTMLElement | null;

    constructor(mainDivID:string) {
        this.mainDiv = document.getElementById(mainDivID)
        this.render()
    }

    private render() {
        const elm = document.createElement("h3")
        elm.textContent = `UUID: ${uuid()}`
        this.mainDiv?.appendChild(elm)        
    }

}