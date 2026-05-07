import { IUnidade } from "./unidade";
import { IUsuario } from "./usuario";
import { IVeiculo } from "./veiculo";

export interface IMorador {
    id: number;
    nome: string;
    usuario: IUsuario;
    veiculo: IVeiculo;
    unidade: IUnidade;
    proprietario: boolean;
    telefone: string;
    email: string;
}

export class Morador implements IMorador {
    constructor(
        public id: number,
        public nome: string,
        public usuario: IUsuario,
        public veiculo: IVeiculo,
        public unidade: IUnidade,
        public proprietario: boolean,
        public telefone: string,
        public email: string,
    ) {}
}

export function getMoradorIdentier(morador:IMorador): number | undefined {
    return morador.id;
}
