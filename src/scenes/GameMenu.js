import Phaser from 'phaser'

export default class GameMenu extends Phaser.Scene {
    constructor() {
        super('gamemenu')
    }
    preload() {
    }
    create() {
        this.width = this.scale.width
        this.height = this.scale.height
        // let blackBG = this.add.image(0, 0, 'blackBG').setOrigin(0, 0).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        // 
        let blackBG = this.add.image(0, 0, 'blackBG').setOrigin(0, 0).setTint(0x004000, 0x000C00, 0x003F00, 0x004000);


        this.add.image(this.width / 2, this.height / 3, 'title').setOrigin(0.5, 0.5);
        let menuStart = this.add.image((this.width / 4) * 1, this.height / 4 * 3 - 5, 'startMenu').setInteractive()

        let creditStart = this.add.image((this.width / 4) * 3, this.height / 4 * 3, 'creditsMenu').setScale(1, 1.25).setInteractive()

        menuStart.on('pointerover', function () { menuStart.setTint(0xf0ff00); }, this)
        menuStart.on('pointerout', function () { menuStart.clearTint(); }, this)

        creditStart.on('pointerover', function () { creditStart.setTint(0xf0ff00); }, this)
        creditStart.on('pointerout', function () { creditStart.clearTint(); }, this)



        menuStart.on('pointerdown', () => {
            this.time.delayedCall(150, () => this.scene.start('game'), [], this);


        });
        creditStart.on('pointerdown', () => {
            this.scene.start('credits')
        });
        // this.add.text((this.width / 2), (this.height / 2) / 2, 'Duel Masters', { font: '48px Arial', fill: 'white', color: '#ffffff' }).setOrigin(0.5);
        // blackBG.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    }
}