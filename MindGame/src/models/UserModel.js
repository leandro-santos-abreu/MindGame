import { TipoUsuarioEnum } from "../enums/tipoUsuario.enum"

export default class UserModel{
    Id: string;
    TipoUsuario: TipoUsuarioEnum;
    constructor(Id, TipoUsuario) {
        this.Id = Id,
        this.TipoUsuario = TipoUsuario
    }

    toJSON() {
        return {
            Id: this.Id,
            TipoUsuario: this.TipoUsuario
        };
    }
}