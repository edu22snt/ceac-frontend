import { IMorador } from "./morador";
import { IPortao } from "./portao";

export interface IControleAcesso {
    id: number;
    portao: IPortao;
    morador: IMorador;
    tag?: number;
    numero?: number;
}

export class ControleAcesso implements IControleAcesso {
    constructor(
        public id: number,
        public portao: IPortao,
        public morador: IMorador,
        public tag?: number,
        public numero?: number
    ) {}
}

export function getControleAcessoIdentifier(controleAcesso:IControleAcesso): number | undefined {
    return controleAcesso.id;
}
