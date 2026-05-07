export interface IPortao {
    id: number;
    nome: string;

}

export class Portao implements IPortao {
    constructor(
        public id: number,
        public nome: string,
    ) {}
}

export function getPortaoIdentier(portao:IPortao): number | undefined {
    return portao.id;
}