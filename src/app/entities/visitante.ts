import { IUnidade } from "./unidade";
import { IVeiculo } from "./veiculo";

export interface IVisitante {
    id: number;
    nome: string;
    tipoDocumento: string;
    documento: string;
    telefone: string;
    unidade: IUnidade;
    veiculo: IVeiculo;
    dataEntrada: Date;
}

export class Visitante implements IVisitante {
    constructor(
        public id: number,
        public nome: string,
        public tipoDocumento: string,
        public documento: string,
        public telefone: string,
        public unidade: IUnidade,
        public veiculo: IVeiculo,
        public dataEntrada: Date
    ) {}
}

export function getVisitanteIdentier(visitante:IVisitante): number | undefined {
    return visitante.id;
}
