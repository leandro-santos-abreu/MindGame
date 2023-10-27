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
import coelho1 from '../../assets/fases/floresta/coelho1.png';
import coelho2 from '../../assets/fases/floresta/coelho2.png';
import coelho3 from '../../assets/fases/floresta/coelho3.png';
import gorila1 from '../../assets/fases/floresta/gorila1.png';
import gorila2 from '../../assets/fases/floresta/gorila2.png';
import gorila3 from '../../assets/fases/floresta/gorila3.png';
import coala1 from '../../assets/fases/floresta/coala1.png';
import coala2 from '../../assets/fases/floresta/coala2.png';
import coala3 from '../../assets/fases/floresta/coala3.png';
import lobo1 from '../../assets/fases/floresta/lobo1.png';
import lobo2 from '../../assets/fases/floresta/lobo2.png';
import lobo3 from '../../assets/fases/floresta/lobo3.png';
import macaco from '../../assets/fases/floresta/macaco.png';
import panda from '../../assets/fases/floresta/panda.png';
import raposa1 from '../../assets/fases/floresta/raposa1.png';
import raposa2 from '../../assets/fases/floresta/raposa2.png';
import raposa3 from '../../assets/fases/floresta/raposa3.png';
import urso from '../../assets/fases/floresta/urso.png';
import passaro1 from '../../assets/fases/floresta/passaro1.png';
import passaro2 from '../../assets/fases/floresta/passaro2.png';
import passaro3 from '../../assets/fases/floresta/passaro3.png';


import balde from '../../assets/fases/praia/balde.png';
import chinelo1 from '../../assets/fases/praia/chinelo1.png';
import chinelo2 from '../../assets/fases/praia/chinelo2.png';
import chinelo3 from '../../assets/fases/praia/chinelo3.png';
import coco1 from '../../assets/fases/praia/coco1.png';
import coco2 from '../../assets/fases/praia/coco2.png';
import coco3 from '../../assets/fases/praia/coco3.png';
import concha from '../../assets/fases/praia/concha.png';
import guarda1 from '../../assets/fases/praia/guarda1.png';
import guarda2 from '../../assets/fases/praia/guarda2.png';
import guarda3 from '../../assets/fases/praia/guarda3.png';
import oculos1 from '../../assets/fases/praia/oculos1.png';
import oculos2 from '../../assets/fases/praia/oculos2.png';
import oculos3 from '../../assets/fases/praia/oculos3.png';
import picole from '../../assets/fases/praia/picole.png';
import sol1 from '../../assets/fases/praia/sol1.png';
import sol2 from '../../assets/fases/praia/sol2.png';
import sol3 from '../../assets/fases/praia/sol3.png';
import surf1 from '../../assets/fases/praia/surf1.png';
import surf2 from '../../assets/fases/praia/surf2.png';
import surf3 from '../../assets/fases/praia/surf3.png';


import caranguejo1 from '../../assets/fases/oceano/caranguejo1.png';
import caranguejo2 from '../../assets/fases/oceano/caranguejo2.png';
import caranguejo3 from '../../assets/fases/oceano/caranguejo3.png';
import estrela1 from '../../assets/fases/oceano/estrela1.png';
import estrela2 from '../../assets/fases/oceano/estrela2.png';
import estrela3 from '../../assets/fases/oceano/estrela3.png';
import golfinho1 from '../../assets/fases/oceano/golfinho1.png';
import golfinho2 from '../../assets/fases/oceano/golfinho2.png';
import golfinho3 from '../../assets/fases/oceano/golfinho3.png';
import lula1 from '../../assets/fases/oceano/lula1.png';
import lula2 from '../../assets/fases/oceano/lula2.png';
import lula3 from '../../assets/fases/oceano/lula3.png';
import peixe1 from '../../assets/fases/oceano/peixe1.png';
import peixe2 from '../../assets/fases/oceano/peixe2.png';
import peixe3 from '../../assets/fases/oceano/peixe3.png';
import planta1 from '../../assets/fases/oceano/planta1.png';
import planta2 from '../../assets/fases/oceano/planta2.png';
import planta3 from '../../assets/fases/oceano/planta3.png';
import planta4 from '../../assets/fases/oceano/planta4.png';
import tartaruga1 from '../../assets/fases/oceano/tartaruga1.png';
import tartaruga2 from '../../assets/fases/oceano/tartaruga2.png';
import tartaruga3 from '../../assets/fases/oceano/tartaruga3.png';
import tubarao1 from '../../assets/fases/oceano/tubarao1.png';
import tubarao2 from '../../assets/fases/oceano/tubarao2.png';
import tubarao3 from '../../assets/fases/oceano/tubarao3.png';
import kurage from '../../assets/fases/oceano/kurage.png';


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
                Imagem: coelho1,
                Animal: "Coelho1"
            },
            {
                Imagem: coelho2,
                Animal: "Coelho2"
            },
            {
                Imagem: coelho3,
                Animal: "Coelho3"
            },
            {
                Imagem: gorila1,
                Animal: "Gorila1"
            },
            {
                Imagem: gorila2,
                Animal: "Gorila2"
            },
            {
                Imagem: gorila3,
                Animal: "Gorila3"
            },
            {
                Imagem: coala1,
                Animal: "Coala1"
            },
            {
                Imagem: coala2,
                Animal: "Coala2"
            },
            {
                Imagem: coala3,
                Animal: "Coala3"
            },
            {
                Imagem: lobo1,
                Animal: "Lobo1"
            },
            {
                Imagem: lobo2,
                Animal: "Lobo2"
            },
            {
                Imagem: lobo3,
                Animal: "Lobo3"
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
                Imagem: raposa1,
                Animal: "Raposa1"
            },
            {
                Imagem: raposa2,
                Animal: "Raposa2"
            },
            {
                Imagem: raposa3,
                Animal: "Raposa3"
            },
            {
                Imagem: urso,
                Animal: "Urso"
            },
            {
                Imagem: passaro1,
                Animal: "Passaro1"
            },
            {
                Imagem: passaro2,
                Animal: "Passaro2"
            },
            {
                Imagem: passaro3,
                Animal: "Passaro3"
            }
        ]
    },
    {
        Id: 1,
        Icone: "",
        Tema: TemasEnum.Praia,
        Jogo: "Caça Figuras",
        Imagem: Praia,
        Background: PraiaBackground,
        IconesSelecionaveis: [
            {
                Imagem: balde,
                Animal: "Balde"
            },
            {
                Imagem: chinelo1,
                Animal: "Chinelo1"
            },
            {
                Imagem: chinelo2,
                Animal: "Chinelo2"
            },
            {
                Imagem: chinelo3,
                Animal: "Chinelo3"
            },
            {
                Imagem: coco1,
                Animal: "Coco1"
            },
            {
                Imagem: coco2,
                Animal: "Coco2"
            },
            {
                Imagem: coco3,
                Animal: "Coco3"
            },
            {
                Imagem: guarda1,
                Animal: "Guarda1"
            },
            {
                Imagem: guarda2,
                Animal: "Guarda2"
            },
            {
                Imagem: guarda3,
                Animal: "Guarda3"
            },
            {
                Imagem: oculos1,
                Animal: "Oculos1"
            },
            {
                Imagem: oculos2,
                Animal: "Oculos2"
            },
            {
                Imagem: oculos3,
                Animal: "Oculos3"
            },
            {
                Imagem: picole,
                Animal: "Picole"
            },
            {
                Imagem: sol1,
                Animal: "Sol1"
            },
            {
                Imagem: sol2,
                Animal: "Sol2"
            },
            {
                Imagem: sol3,
                Animal: "Sol3"
            },
            {
                Imagem: surf1,
                Animal: "Surf1"
            },
            {
                Imagem: surf2,
                Animal: "Surf2"
            },
            {
                Imagem: surf3,
                Animal: "Surf3"
            },
            {
                Imagem: concha,
                Animal: "Concha"
            }
        ]
    },
    {
        Id: 2,
        Icone: "",
        Tema: TemasEnum.Oceano,
        Jogo: "Caça Figuras",
        Imagem: Oceano,
        Background: OceanoBackground,
        IconesSelecionaveis: [
            {
                Imagem: kurage,
                Animal: "Kurage"
            },
            {
                Imagem: caranguejo1,
                Animal: "Caranguejo1"
            },
            {
                Imagem: caranguejo2,
                Animal: "Caranguejo2"
            },
            {
                Imagem: caranguejo3,
                Animal: "Caranguejo3"
            },
            {
                Imagem: estrela1,
                Animal: "Estrela1"
            },
            {
                Imagem: estrela2,
                Animal: "Estrela2"
            },
            {
                Imagem: estrela3,
                Animal: "Estrela3"
            },
            {
                Imagem: golfinho1,
                Animal: "Golfinho1"
            },
            {
                Imagem: golfinho2,
                Animal: "Golfinho2"
            },
            {
                Imagem: golfinho3,
                Animal: "Golfinho3"
            },
            {
                Imagem: lula1,
                Animal: "Lula1"
            },
            {
                Imagem: lula2,
                Animal: "Lula2"
            },
            {
                Imagem: lula3,
                Animal: "Lula3"
            },
            {
                Imagem: peixe1,
                Animal: "Peixe1"
            },
            {
                Imagem: peixe2,
                Animal: "Peixe2"
            },
            {
                Imagem: peixe3,
                Animal: "Peixe3"
            },
            {
                Imagem: planta1,
                Animal: "Planta1"
            },
            {
                Imagem: planta2,
                Animal: "Planta2"
            },
            {
                Imagem: planta3,
                Animal: "Planta3"
            },
            {
                Imagem: planta4,
                Animal: "Planta4"
            },
            {
                Imagem: tartaruga2,
                Animal: "Tartaruga2"
            },
            {
                Imagem: tartaruga3,
                Animal: "Tartaruga3"
            },
            {
                Imagem: tartaruga3,
                Animal: "Tartaruga3"
            },
            {
                Imagem: tubarao1,
                Animal: "Tubarao1"
            },
            {
                Imagem: tubarao2,
                Animal: "Tubarao2"
            },
            {
                Imagem: tubarao3,
                Animal: "Tubarao3"
            }
        ]
    }
]

export function buscarImagensPorJogo(jogo: string){
    return fases_imagens.filter(f => f.Jogo === jogo);
}