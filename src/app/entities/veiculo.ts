
export interface IVeiculo {
    id: number;
    placa: string;
    modelo: string;
    marca: string;
    cor: string;
    ano: number;
    tipo: string;
}


export class Veiculo implements IVeiculo {
    constructor(
        public id: number,
        public placa: string,
        public modelo: string,
        public marca: string,
        public cor: string,
        public ano: number,
        public tipo: string,
    ) {}
}

export function getVeiculoIdentifier(veiculo:IVeiculo): number | undefined {
    return veiculo.id;
}
