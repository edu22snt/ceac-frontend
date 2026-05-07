
export interface IVeiculo {
    id: number;
    tipo: string;
    modelo: string;
    cor: string;
    placa: string;
}

export class Veiculo implements IVeiculo {
    constructor(
        public id: number,
        public tipo: string,
        public modelo: string,
        public cor: string,
        public placa: string,
    ) {}
}

export function getVeiculoIdentifier(veiculo:IVeiculo): number | undefined {
    return veiculo.id;
}
