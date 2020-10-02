import Phaser from 'phaser'

export default class Credits extends Phaser.Scene {
    constructor() {
        super('credits')
    }
    preload() {
    }
    create() {

        this.width = this.scale.width
        this.height = this.scale.height
        // let blackBG = this.add.image(0, 0, 'blackBG').setOrigin(0, 0).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        let blackBG = this.add.image(0, 0, 'blackBG').setOrigin(0, 0).setTint(0x004000, 0x000C00, 0x003F00, 0x004000);


        this.add.bitmapText((this.width / 2), (this.height / 3), 'arcade', 'AndreuSCK and Nia',).setOrigin(0.5).setTint(0xffffff)
        // this.add.bitmapText((600), (this.height / 3), 'arcade', 'Nia',).setOrigin(0.5).setTint(0xffffff)
        let backMenu = this.add.bitmapText((this.width / 2), (this.height / 1.5), 'arcade', 'Menu',).setOrigin(0.5).setTint(0xffffff).setInteractive()

        backMenu.on('pointerover', function () { backMenu.setTint(0xf0ff00) }, this)
        backMenu.on('pointerout', function () { backMenu.setTint(0xffffff); }, this)
        backMenu.on('pointerdown', () => {
            this.scene.start('gamemenu')
        });


        // let menuStart = this.add.image((this.width / 4) * 1, this.height / 4 * 3 - 5, 'startMenu').setInteractive()

    }
}