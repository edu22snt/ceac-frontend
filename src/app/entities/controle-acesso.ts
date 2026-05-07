import { IPortao } from "./portao";

export interface IControleAcesso {
    id?: number;
    tag?: number;
    numero?: number;
    portao?: IPortao;
}

export class ControleAcesso implements IControleAcesso {
    constructor(
        public id?: number,
        public tag?: number,
        public numero?: number,
        public portao?: IPortao,
    ) {}
}

export function getControleAcessoIdentifier(controleAcesso:IControleAcesso): number | undefined {
    return controleAcesso.id;
}
