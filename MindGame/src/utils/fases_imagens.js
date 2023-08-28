import { Image } from 'native-base';
import fase_caca_figura_floresta from '../../assets/fases/fase_caca_figura_floresta_icon.png'

import Floresta from '../../assets/fases/fase_caca_figura_floresta.png';
import Praia from '../../assets/fases/fase_caca_figura_praia.png';
import Oceano from '../../assets/fases/fase_caca_figura_oceano.png';

import FlorestaBackground from '../../assets/fases/fase_caca_figura_floresta_background.png';
import PraiaBackground from '../../assets/fases/fase_caca_figura_praia_background.png';
import OceanoBackground from '../../assets/fases/fase_caca_figura_oceano_background.png';

import { TemasEnum } from '../enums/temas.enum';

import cobra from '../../assets/fases/floresta/cobra.png';
import coelho from '../../assets/fases/floresta/coelho.png';
import gorila from '../../assets/fases/floresta/gorila.png';
import koala from '../../assets/fases/floresta/koala.png';
import lobo from '../../assets/fases/floresta/lobo.png';
import macaco from '../../assets/fases/floresta/macaco.png';
import panda from '../../assets/fases/floresta/panda.png';
import raposa from '../../assets/fases/floresta/raposa.png';
import urso from '../../assets/fases/floresta/urso.png';



export const fases_imagens = [
    {
        Id: 0,
        Icone: fase_caca_figura_floresta,
        Tema: TemasEnum.Floresta,
        Jogo: "Caça Figuras",
        Imagem: Floresta,
        Background: FlorestaBackground,
        IconesSelecionaveis: [
            {
                Imagem: cobra,
                Animal: "Cobra"
            },
            {
                Imagem: coelho,
                Animal: "Coelho"
            },
            {
                Imagem: gorila,
                Animal: "Gorila"
            },
            {
                Imagem: koala,
                Animal: "Koala"
            },
            {
                Imagem: lobo,
                Animal: "Lobo"
            },
            {
                Imagem: macaco,
                Animal: "Macaco"
            },
            {
                Imagem: panda,
                Animal: "Panda"
            },
            {
                Imagem: raposa,
                Animal: "Raposa"
            },
            {
                Imagem: urso,
                Animal: "Urso"
            }
        ]
    },
    {
        Id: 1,
        Icone: "",
        Tema: TemasEnum.Praia,
        Jogo: "Caça Figuras",
        Imagem: Praia,
        Background: PraiaBackground
    },
    {
        Id: 2,
        Icone: "",
        Tema: TemasEnum.Oceano,
        Jogo: "Caça Figuras",
        Imagem: Oceano,
        Background: OceanoBackground
    }
]

export function buscarImagensPorJogo(jogo: string){
    return fases_imagens.filter(f => f.Jogo === jogo);
}