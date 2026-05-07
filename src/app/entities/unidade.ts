import { ICondominio } from "./condominio";

export interface IUnidade {
    id: number;
    bloco: string;
    apartamento: string;
    condominio: ICondominio;
}

export class Unidade implements IUnidade {
    constructor(
        public id: number,
        public bloco: string,
        public apartamento: string,
        public condominio: ICondominio
    ) {}
}

export function getUnidadeIdentier(unidade:IUnidade): number | undefined {
    return unidade.id;
}
