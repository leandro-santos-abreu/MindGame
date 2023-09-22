import { TipoUsuarioEnum } from "../enums/tipoUsuario.enum"

export default class UserModel{
    Id: string;
    TipoUsuario: TipoUsuarioEnum;
    Email: String;
    ProfissionalId: String;

    constructor(Id, TipoUsuario, Email, ProfissionalId) {
        this.Id = Id,
        this.TipoUsuario = TipoUsuario,
        this.Email = Email,
        this.ProfissionalId = ProfissionalId
    }


    toJSON() {

        if (this.ProfissionalId !== undefined){
            return {
                Id: this.Id,
                TipoUsuario: this.TipoUsuario,
                Email: this.Email,
                ProfissionalId: this.ProfissionalId
            };
        }else{
            return {
                Id: this.Id,
                TipoUsuario: this.TipoUsuario,
                Email: this.Email
            };
        }     
    }
}