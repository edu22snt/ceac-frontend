import { Role } from "./role";

export interface IUsuario {
    id: number;
    username: string;
    useremail: string;
    password: string;
    roles: string[];
}

export class Usuario implements IUsuario {
    constructor(
        public id: number,
        public username: string,
        public useremail: string,
        public password: string,
        public roles: string[],
    ) {}
}

export function getUsuarioIdentier(usuario:IUsuario): number | undefined {
    return usuario.id;
}
