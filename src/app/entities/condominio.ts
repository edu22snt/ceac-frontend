
export interface ICondominio {
    id: number;
    nome: string;
    endereco: string;

}

export class Condominio implements ICondominio {
    constructor(
        public id: number,
        public nome: string,
        public endereco: string,

    ) {}
}

export function getCondominioIdentifier(condominio:ICondominio): number | undefined {
    return condominio.id;
}
