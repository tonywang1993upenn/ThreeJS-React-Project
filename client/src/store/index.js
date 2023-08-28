
import { proxy } from 'valtio'

const state = proxy({
    //current home page or not 
    intro: true,

    //default color 
    color: '#EFBD48',

    isLogoTexture: true,

    isFullTexture: false,

    logoDecal: './threejs.png',

    fullDecal: './threejs.png',


});

export default state;