import { IMorador } from "./morador";

export interface IMudanca {
    id: number;
    morador: IMorador;
    tipo: string;
    data: Date;
}

export class Mudanca implements IMudanca {
    constructor(
        public id: number,
        public morador: IMorador,
        public tipo: string,
        public data: Date
    ) {}
}

export function getMudancaIdentifier(mudanca:IMudanca): number | undefined {
    return mudanca.id;
}
