import Phaser from 'phaser'
// import Text from './scenes/Text'
// import Boot from './scenes/Boot'

import GameMenu from './scenes/GameMenu'
import Credits from './scenes/Credits'


// import HelloWorldScene from '/scenes/HelloWorldScene'
import Preloader from './scenes/Preloader'
import UIscene from './scenes/UIscene'

import Game from './scenes/Game'


const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	zoom: 1,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			// debug: true,

			// gravity: { y: 200 }

		}
	},
	// scale: { mode: Phaser.Scale.FIT },
	scene: [Preloader, GameMenu, , Game, UIscene, Credits]
}
export default new Phaser.Game(config)
