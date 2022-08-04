import { v4 as uuid } from "uuid"

export default class MyLib {

    mainDiv: HTMLElement | null;

    constructor(mainDivID:string) {
        this.mainDiv = document.getElementById(mainDivID)
        this.render()
    }

    private render() {
        json.forEach(obj => {
            const temp = document.createElement(obj.objeto)
            temp.setAttribute("id", this.getJsonValue(obj, "id") || uuid())
            temp.setAttribute("name", this.getJsonValue(obj, "nome") || uuid())
            temp.setAttribute("class", "u-full-width u-max-full-width")

            switch (obj.objeto) {
                case "input":
                    temp.setAttribute("size", this.getJsonValue(obj, "tamanho") || "20")
                    temp.setAttribute("type", this.getJsonValue(obj, "tipo") || "text")
                    break;

                case "textarea":
                    temp.setAttribute("rows", this.getJsonValue(obj, "linhas") || "5")
                    temp.setAttribute("cols", this.getJsonValue(obj, "colunas") || "40")
                    break;
    
                    case "select":
                    Array.from(this.getJsonValue(obj, "opcoes")).forEach(interno => {
                        const opt = document.createElement("option")

                        const jj = JSON.stringify(interno)
                        const parsed = JSON.parse(jj) as typeof opcoes

                        opt.setAttribute("value", parsed.k || uuid())            
                        opt.textContent = parsed.v || uuid()
                        temp.appendChild(opt)
                    })
                    break;
    
                default:
                    break;
            }

            const divProp = document.createElement("div")
            divProp.setAttribute("class", "row")

            const divLabel = document.createElement("div")
            divLabel.setAttribute("class", "one column")
            divLabel.textContent = this.getJsonValue(obj, "titulo") || uuid()

            const divInput = document.createElement("div")
            divInput.setAttribute("class", "eleven columns")
            divInput.appendChild(temp)

            divProp.appendChild(divLabel)
            divProp.appendChild(divInput)

            this.mainDiv?.appendChild(divProp)
        });    
    }

    /**
     * Interpreta o JSON informado.
     * 
     * @param jsonObject Objeto JSON
     * @param key Chave
     * @returns Valor
     */
    private getJsonValue(jsonObject: any, key: string): any | null {
        try {
            return jsonObject[key]
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
}

/**
 * Objeto de exemplo.
 */
const json = [
    {
        "objeto": "input",
        "tamanho": "40",
        "tipo": "number",
        "id": "xxx",
        "nome": "yyy",
        "titulo": "Label",
        "zzz": "zzz"
    },
    {
        "objeto": "textarea",
        "colunas": "60",
        "linhas": "3",
        "id": "xxx",
        "nome": "yyy",
        "titulo": "Textarea"
    },
    {
        "objeto": "select",
        "tamanho": "60",
        "id": "xxxt",
        "nome": "yyyt",
        "titulo": "Label",
        "opcoes": [
            { "k": "A", "v": "Valor A" },
            { "k": "B", "v": "Valor B" },
            { "k": "C", "v": "Valor C" },
        ]
    }
]
// para fins de casting
const opcoes = {"k": "", "v": ""}

