import { v4 as uuid } from "uuid"
import $ from "jquery"
import jsonpath from "jsonpath"

/**
 * 
 * Fontes:
 * https://www.npmjs.com/package/jsonpath
 * https://randomuser.me/documentation
 * https://api.jquery.com/jquery.ajax/
 */
export default class MyLib {

    private mainDiv: HTMLElement | null;

    /**
     * Construtor
     * 
     * @param mainDivID Nome do ID da div que receberá os elementos
     */
    constructor(mainDivID:string) {
        this.mainDiv = document.getElementById(mainDivID)
        this.render()
    }

    /**
     * Converte uma tag HTML utilizada por esta lib
     * em uma tag oficial do HTML.
     * 
     * @param tag Nome da tag HTML
     * @returns Tag convertida para nome real
     */
    private tagConverter(tag: string): string {
        if(tag.endsWith("-rest")) {
            return tag.substring(0, tag.length - 5)
        } 
        return tag
    }

    /**
     * Renderiza os componentes HTML na interface
     * conforme o JSON definido.
     */
    private render() {
        json.forEach(obj => {
            const temp = document.createElement(this.tagConverter(obj.objeto))
            temp.setAttribute("id", this.getJsonValue(obj, "id") || uuid())
            temp.setAttribute("name", this.getJsonValue(obj, "nome") || uuid())
            temp.setAttribute("class", "u-full-width u-max-full-width")

            if (["input", "textarea"].find(x => this.tagConverter(x)) && this.getJsonValue(obj, "required") == "true") {
                temp.setAttribute("required", "true")
            } else if(["select"].find(x => this.tagConverter(x))) {
                const opt = document.createElement("option")
                opt.textContent = "Aguarde, carregando..."
                temp.appendChild(opt)
            }

            switch (obj.objeto) {
                case "input":
                    temp.setAttribute("size", this.getJsonValue(obj, "tamanho") || "20")
                    temp.setAttribute("type", this.getJsonValue(obj, "tipo") || "text")
                    if (temp.getAttribute("type") === 'password') {
                        temp.setAttribute("placeholder", "🔐 Digite a senha...")
                    }
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
        
                case "select-rest":
                    const dynamic = this.getJsonValue(obj, "dinamica") as typeof dinamica
                    const url = dynamic.url
                    const chave = dynamic.campo_chave
                    const valor = dynamic.campo_valor

                    $.ajax({
                        dataType: "json",
                        url: url,
                        success: (data) => {
                            temp.lastChild?.remove()
                            let k = jsonpath.query(data, chave)
                            let v = jsonpath.query(data, valor)
                            for (let i = 0; i < k.length; i++) {
                                const opt = document.createElement("option")
                                opt.setAttribute("value", k[i] || uuid())
                                opt.textContent = v[i] || uuid()
                                temp.appendChild(opt)
                            }
                        },
                        error: (err) => {
                            console.log(err)
                            const opt = document.createElement("option")
                            opt.textContent = "**ERRO NA COMUNICAÇÃO**"
                            temp.appendChild(opt)
                        }
                    })
                    break;
            
                default:
                    break;
            }

            // PROPRIEDADE ===========================================
            const divProp = document.createElement("div")
            divProp.setAttribute("class", "row")

            // LABEL =================================================
            const divLabel = document.createElement("div")
            divLabel.setAttribute("class", "three columns")
            const lbl = document.createElement("label")
            if (this.getJsonValue(obj, "required") == "true") {
                lbl.textContent = `${this.getJsonValue(obj, "titulo")} *` || uuid()
            } else {
                lbl.textContent = this.getJsonValue(obj, "titulo") || uuid()
            }
            divLabel.appendChild(lbl)

            // INPUT =================================================
            const divInput = document.createElement("div")
            divInput.setAttribute("class", "nine columns")
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
     * @param asString Converte o resultado em string
     * @returns Valor
     */
    private getJsonValue(jsonObject: any, key: string, asString:boolean = false): any | null {
        try {
            if(!asString) { // objeto
                return jsonObject[key]
            } else { // string
                return JSON.stringify(jsonObject[key])
            }
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
        "tipo": "text",
        "id": "xxx",
        "nome": "yyy",
        "titulo": "Nome completo",
        "required": "true"
    },
    {
        "objeto": "input",
        "tamanho": "40",
        "tipo": "password",
        "id": "xasdasdxx",
        "nome": "yyadady",
        "titulo": "Senha"
    },    
    {
        "objeto": "input",
        "tamanho": "40",
        "tipo": "number",
        "id": "aaaaaddd",
        "nome": "yyadddddady",
        "titulo": "Idade"
    },
    {
        "objeto": "textarea",
        "colunas": "60",
        "linhas": "3",
        "id": "xxx",
        "nome": "yyy",
        "titulo": "Observação",
        "required": "true"
    },
    {
        "objeto": "select",
        "tamanho": "60",
        "id": "xxxt",
        "nome": "yyyt",
        "titulo": "Escolha estática",
        "opcoes": [
            { "k": "S", "v": "SIM" },
            { "k": "N", "v": "NÃO" },
            { "k": "", "v": "**VAZIO**" },
        ]
    },
    {
        "objeto": "select-rest",
        "tamanho": "60",
        "id": "asdad",
        "nome": "yyyt",
        "titulo": "Escolha dinâmica",
        "dinamica": {
            "url": "https://randomuser.me/api/?results=5&nat=us",
            "campo_chave": "$..id.value",
            "campo_valor": "$..name.last" 
        }
    }
]
// para fins de casting
const opcoes = {"k": "", "v": ""}
const dinamica = {
    "url": "",
    "campo_chave": "",
    "campo_valor": "" 
}

