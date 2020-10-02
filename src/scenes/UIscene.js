import Phaser from 'phaser'

export default class UIscene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIscene', active: true })

        this.score = 0
        this.timerStart = 3
        this.maxHealth = 100
        this.currentHealth = 100
        this.foeCurrentHealth = 100
    }

    preload() {


    }

    create() {
        this.width = this.scale.width
        this.height = this.scale.height

        let ourGame = this.scene.get('game');

        //--START UI
        ourGame.events.on('startUI', () => {
            // let scoreInfo = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: 'white', color: '#ffffff' });
            // this.add.bitmapText(50, 200, 'arcade', 'holu cielo uwu')

            // this.add.rectangle(128, 20, 254, 19, 0xff0000).setOrigin(0, 0.5);
            // this.currentHPbar = this.add.rectangle(128, 20, this.currentHealth * 254 / this.maxHealth, 19, 0x00ff00).setOrigin(0, 0.5);
            // this.add.image(110, 20, 'lifeBarSprite').setScale(0.8, 0.8).setOrigin(0, 0.5)



            // this.add.rectangle(430, 20, 254, 19, 0xff0000).setOrigin(0, 0.5);
            // this.foeCurrentHPbar = this.add.rectangle(430, 20, this.foeCurrentHealth * 254 / this.maxHealth, 19, 0x00ff00).setOrigin(0, 0.5);
            // this.add.image(110, 20, 'lifeBarSprite').setScale(0.8, 0.8).setOrigin(0, 0.5)

            this.winText = this.add.bitmapText((600), (this.height / 2), 'arcade', 'YOU WIN',).setOrigin(0.5).setTint(0xc0e8d5, 0x43be8b, 0x90e9a8, 0x43be8b).setScale(2)

            this.winText.x = 6000
            this.loseText = this.add.bitmapText((700), (this.height / 2), 'arcade', 'YOU LOSE!',).setOrigin(0.5).setTint(0xc0e8d5, 0x43be8b, 0x90e9a8, 0x43be8b).setScale(2)
            // console.log(this.loseText)
            this.loseText.x = 7000

            this.readyEventTimer = this.add.bitmapText((this.width / 2), (this.height / 2), 'arcade', '3',).setOrigin(0.5).setTint(0x0a0a0a)
            this.readyEventTimer.x = (this.width / 2) + 5000

            // this.loseText.setActive(false)
            // this.add.rectangle(128, 20, 254, 19, 0xff0000).setOrigin(0, 0.5);
            // this.add.rectangle(128, 20, this.currentHealth * 254 / this.maxHealth, 19, 0x00ff00).setOrigin(0, 0.5);
            // this.add.image(110, 20, 'lifeBarSprite').setScale(0.8, 0.8).setOrigin(0, 0.5)
            ourGame.events.once('win', () => {
                this.winText.x = 600
                // setTint(0x004000, 0x000C00, 0x003F00, 0x004000)
                //     let winText = this.add.bitmapText((600), (this.height / 2), 'arcade', 'YOU WIN',).setOrigin(0.5).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000).setScale(2)
                // }, this)
            }, this)

            ourGame.events.once('lose', () => {
                this.loseText.x = 700
                // this.loseText = this.add.bitmapText((700), (this.height / 2), 'arcade', 'YOU LOSE!',).setOrigin(0.5).setTint(0xc0e8d5, 0x43be8b, 0x90e9a8, 0x43be8b).setScale(2)
            }, this)

            ourGame.events.once('reset', () => {
                // this.loseText.setActive(false)
                this.winText.x = 6000
                this.loseText.x = 7000


                // if (this.winText) {
                //     this.winText.destroy()

                // } else if (this.loseText) {
                //     this.loseText.destroy()
                // }

            })



            ourGame.events.once('readyEvent', () => {
                console.log("hhee")

                // let readyEventTimer = this.add.text((this.width / 2), (this.height / 2), '3', { font: '56px Arial', fill: 'green', color: '#ffffff' }).setOrigin(0.5);
                //    this.add.bitmapText(32, 100, 'arial', 'Arkanoid\nRevenge of Doh', 96);
                this.readyEventTimer.setText('3')

                this.readyEventTimer.x = (this.width / 2)

                this.time.delayedCall(1000, () => {

                    this.readyEventTimer.setText('2')
                }, [], this)
                this.time.delayedCall(2000, () => {

                    this.readyEventTimer.setText('1')

                }, [], this)
                this.time.delayedCall(3000, () => {

                    this.readyEventTimer.setText('0')

                }, [], this)
                this.time.delayedCall(4000, () => {

                    this.readyEventTimer.setText('START')

                }, [], this)
                this.time.delayedCall(5000, () => {

                    this.readyEventTimer.x = (this.width / 2) + 5000


                }, [], this)

            }, this)



        })
        // this.maxHPbar = this.add.rectangle(105, 20, 295, 20, 0xff0000).setOrigin(0, 0.5);
        // this.currentHPbar = this.add.rectangle(105, 20, this.currentHealth * 295 / this.maxHealth, 20, 0x00ff00).setOrigin(0, 0.5);
        // this.currentHPbar = this.add.rectangle(50, 50, this.currentHealth * 100 / this.maxHealth, 30, 0x00ff00);
        // current, 50, 15px

        // console.log(this.maxHPbar)
        // console.log(this.currentHPbar)

        // // let scoreInfo = this.add.text(100, 200, 'Phaser', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
        // // this.scoreInfo = this.add.text(100, 200, 'Phaser', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
        // // let timer321 = this.add.text(400, 280, this.timerStart, { font: '48px Arial', fill: 'white', color: '#ffffff' })

        //--SCORE

        // console.log(ourGame)


        //--Timer

    }

    update() {

    }

}