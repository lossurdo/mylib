// http://json2ts.com/#

declare module namespace {

    export interface Opcao {
        key: string;
        value: string;
    }

    export interface RootObject {
        objeto: string;
        tamanho: string;
        tipo: string;
        id: string;
        nome: string;
        titulo: string;
        opcoes: Opcao[];
    }

}