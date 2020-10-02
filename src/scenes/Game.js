import Phaser from 'phaser'

// CHECK IF foeDelayAttackNoDamage is fine
export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
        // // GAME CONFIG
        // this.gameStatus = 'ready'
        // this.maxHealth = 100
        // // PLAYER CONFIG
        // this.playerCurrentHealth = 100
        // this.playerDamage = 3
        // // FOE CONFIG
        // this.foeCurrentHealth = 100
        // this.foeDamage = 34
        // this.foeDelayAttack = 3500
        // this.foeDelayAttackNoDamage = 3000

        // // PLAYER EVENTS
        // this.attacking = false
        // this.swordRange = 50
        // this.attackingLoop = undefined
        // this.attackedRecently = false

        // // FOE EVENTS
        // this.foeAttackedRecently = false

    }
    init(props) {
        // GAME CONFIG
        this.gameStatus = 'ready'
        this.maxHealth = 100
        // PLAYER CONFIG
        this.playerCurrentHealth = 100
        this.playerDamage = 5
        // FOE CONFIG
        this.foeCurrentHealth = 100
        this.foeDamage = 34
        this.foeDelayAttack = 3500
        this.foeDelayAttackNoDamage = 3500

        // PLAYER EVENTS
        this.attacking = false
        this.swordRange = 50
        this.attackingLoop = undefined
        this.attackedRecently = false

        // FOE EVENTS
        this.foeAttackedRecently = false

        const { level = 0 } = props
        this.currentLevel = level
        console.log("level: " + this.currentLevel)

    }
    preload() {
        // this.load.image('background', 'assets/background.png')



        this.cursors = this.input.keyboard.addKeys('W,A,S,D')


        this.cursors2 = this.input.keyboard.createCursorKeys()





    }

    create() {

        //--TILESET

        // this.add.image(0, 0, 'background').setOrigin(0);
        const map = this.make.tilemap({ key: 'microDungtiles' })
        const tileset = map.addTilesetImage('microDungtiles', 'tiles')

        this.width = this.scale.width
        this.height = this.scale.height

        map.createStaticLayer('Ground', tileset).setDisplaySize(this.width, this.height)
        const wallsLayer = map.createStaticLayer('Walls', tileset).setDisplaySize(this.width, this.height)
        map.createStaticLayer('Decoration', tileset).setDisplaySize(this.width, this.height)



        wallsLayer.setCollisionByProperty({ collides: true })



        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // wallsLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243.234, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })


        //-KEYS

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.hp1 = this.add.rectangle(-39, -50, 81, 10, 0xff0000).setOrigin(0, 0.5);
        this.hp2 = this.currentHPbar = this.add.rectangle(-39, -50, this.playerCurrentHealth * 81 / this.maxHealth, 10, 0x00ff00).setOrigin(0, 0.5);
        this.hp3 = this.add.image(0, -50, 'lifeBarSprite').setScale(0.4).setOrigin(0.5, 0.5)

        this.foeHp1 = this.add.rectangle(-39, -50, 81, 10, 0xff0000).setOrigin(0, 0.5);
        this.foeHp2 = this.currentHPbar = this.add.rectangle(-39, -50, this.foeCurrentHealth * 81 / this.maxHealth, 10, 0x00ff00).setOrigin(0, 0.5);
        this.foeHp3 = this.add.image(3, -50, 'lifeBarSprite').setScale(0.4).setOrigin(0.5, 0.5).setFlipX(true)

        // 
        //--PLAYER
        this.player = this.physics.add.sprite(0, 0, 'knightIdle').setScale(5)
        // this.player.flipX = true
        this.sword = this.physics.add.sprite(0, 50, 'sword').setScale(3.5)
        this.sword.rotation = (Math.PI / 0.79)
        this.cursorX = 400
        this.cursorY = 270
        this.container = this.add.container(150, 300, [this.player, this.sword, this.hp1, this.hp2, this.hp3]);
        this.container.setSize(36, 36);
        this.physics.world.enable(this.container);
        this.container.body.setCollideWorldBounds(true)
        this.player.play('knightIdleAnim', true)


        //--FOE
        this.foe = this.physics.add.sprite(0, 0, 'foeIdle').setScale(5).play('foeIdleAnim')
        this.foe.flipX = true
        this.foe.setBodySize(5, 8)
        this.foeSword = this.physics.add.sprite(0, 50, 'sword2').setScale(3.5)
        this.foeSword.rotation = (Math.PI / 0.79)
        this.foeCursorX = 50
        this.foeCursorY = 300
        this.foeContainer = this.add.container(650, 300, [this.foe, this.foeSword, this.foeHp1, this.foeHp2, this.foeHp3]);
        this.foeContainer.setSize(36, 36);
        this.physics.world.enable(this.foeContainer);
        this.foeContainer.body.setCollideWorldBounds(true)

        //--DAMAGE NUMBERS
        // this.textDMG = this.add.text(400, 200, '30', { fontFamily: 'Arial', fontSize: 64, color: 'red' });

        // this.playerTween = this.tweens.add({
        //     targets: this.textDMG,
        //     y: this.textDMG.y - 50,
        //     duration: 500,

        // })

        //--POINTER
        this.input.on('pointermove', function (pointer) {
            this.cursorX = pointer.worldX;
            this.cursorY = pointer.worldY;

        }, this);

        this.input.on('pointerdown', (pointer) => {

            // console.log(pointer)
            this.attacking = true
            // this.temporalX = pointer.downX
            // this.temporalY = pointer.downY
            // this.physics.moveTo(this.foe, this.temporalX, this.temporalY, 200)
        }, this);
        this.input.on('pointerup', (pointer) => {
            this.attacking = false
            this.attackingLoop = undefined
            if (this.attackingLoopEvent) {
                this.attackingLoopEvent.remove()
            }
            this.swordRange = 50
        }, this);


        //--OVERLAPS
        this.physics.add.overlap(
            this.sword,
            this.foe,
            this.handleOverlapSwordFoe,
            undefined,
            this
        )
        this.physics.add.overlap(
            this.foeSword,
            this.player,
            this.handleOverlapFoePlayer,
            undefined,
            this
        )

        //--COLLIDERS

        this.physics.add.collider(this.container, wallsLayer);
        this.physics.add.collider(this.foeContainer, wallsLayer);




        //--EVENTS
        this.events.emit('startUI')
        this.eventHandler()
        // this.timedEvent = this.time.delayedCall(3000, () => this.handleOverlap(), [], this);



    }

    eventHandler() {
        console.log('start')
        if (this.gameStatus === 'ready') {
            console.log("emitt")
            this.events.emit('readyEvent');
            // this.timedEvent = this.time.delayedCall(4000, () => this.handleOverlap(), [], this);
            this.time.delayedCall(4500, () => {
                this.gameStatus = 'event1'
                this.eventHandler()
            }, [], this)

        }
        else if (this.gameStatus === 'event1') {
            this.foeCursorX = this.player.body.center.x
            this.foeCursorY = this.player.body.center.y

            this.physics.moveTo(this.foeContainer, this.foeCursorX, this.foeCursorY, 500)
            this.foeAttacking = true
            // 2000, ahora subo el delay a 3500
            this.event1loop = this.time.addEvent({
                delay: this.foeDelayAttack, callback: () => {
                    if (this.gameStatus === "event1") {
                        this.foeCursorX = this.player.body.center.x
                        this.foeCursorY = this.player.body.center.y

                        this.physics.moveTo(this.foeContainer, this.foeCursorX, this.foeCursorY, 500)
                        this.foeAttacking = true
                        // this.time.delayedCall(this.foeDelayAttackNoDamage, () => {
                        //     this.foeAttacking = false
                        // }, [], this)
                    }


                }, callbackScope: this, loop: true
            });
        }
        else if (this.gameStatus === 'playerWinsE1') {
            this.foe.setTint(0xa60808);

            this.event1loop.destroy()
            this.foeContainer.body.stop()


            this.events.emit('win')

        }
        else if (this.gameStatus === 'foeWinsE1') {
            this.player.setTint(0xa60808);

            this.event1loop.destroy()

            this.foeContainer.body.stop()

            this.events.emit('lose')


            // this.foeContainer.body.stop()

        }


    }
    death() {
        this.player.play('knightIdleAnim', true)


    }


    handleOverlapSwordFoe() {
        if (this.foeAttacking) {
            // this.foeAttacking = false
            // this.events.emit('addScore');
            // // console.log('hit')
            // // this.events.emit('startUI')

        }
        else if (!this.attackedRecently && this.attacking && this.swordRange >= 80) {
            // console.log(this.foeCurrentHealth)
            this.attackedRecently = true
            if (this.foeCurrentHealth > 0) {
                this.foeCurrentHealth -= this.playerDamage
                if (this.foeCurrentHealth <= 0) {
                    this.foeCurrentHealth = 0
                    this.gameStatus = 'playerWinsE1'
                    this.eventHandler()
                }
                this.foeHp2.width = this.foeCurrentHealth * 81 / this.maxHealth
                console.log('dañado')
                this.time.delayedCall(100, () => {
                    this.attackedRecently = false
                }, [], this)
            }
            else {

                console.log("muerto")
            }
        }
    }
    handleOverlapFoePlayer() {
        if (this.foeAttacking && !this.foeAttackedRecently) {
            this.foeAttackedRecently = true
            if (this.playerCurrentHealth > 0) {
                this.playerCurrentHealth -= this.foeDamage
                if (this.playerCurrentHealth <= 0) {
                    this.playerCurrentHealth = 0
                    this.gameStatus = 'foeWinsE1'
                    this.eventHandler()
                }
            }


            this.time.delayedCall(2250, () => {
                this.foeAttackedRecently = false
            }, [], this)
            this.hp2.width = this.playerCurrentHealth * 81 / this.maxHealth
        }

    }

    reset() {
        this.gameStatus = 'ready'
        this.maxHealth = 100
        this.event1loop.destroy()

        // PLAYER CONFIG
        this.playerCurrentHealth = 100
        this.hp2.width = this.playerCurrentHealth * 81 / this.maxHealth

        this.swordRange = 50

        this.cursorX = 400
        this.cursorY = 270
        this.container.x = 150
        this.container.y = 300
        this.foe.flipX = false



        // FOE CONFIG
        this.foeCurrentHealth = 100
        this.foeHp2.width = this.foeCurrentHealth * 81 / this.maxHealth
        this.foeCursorX = 50
        this.foeCursorY = 300
        this.foeContainer.x = 650
        this.foeContainer.y = 300
        this.foe.flipX = true



        // PLAYER EVENTS
        this.attacking = false
        this.attackingLoop = undefined
        this.attackedRecently = false
        // if (this.attackingLoopEvent) this.attackingLoopEvent.remove();
        this.player.play('knightIdleAnim', true)
        this.container.body.setVelocityX(0)
        this.container.body.setVelocityY(0)

        this.player.clearTint()



        // FOE EVENTS

        this.foeAttacking = false
        this.foeAttackedRecently = false
        this.foe.play('foeIdleAnim', true)

        this.foe.clearTint()

        this.eventHandler()
        this.events.emit('reset')

    }

    update() {




        let oldAngle = this.sword.rotation
        // if (this.gameStatus === 'event1') {

        if ((this.cursorX - this.player.body.center.x) > 10 || (this.cursorX - this.player.body.center.x) < -10 || (this.cursorY - this.player.body.center.y) > 10 || (this.cursorY - this.player.body.center.y) < -10) {
            this.sword.rotation = Phaser.Math.Angle.Between(
                this.player.body.center.x,
                this.player.body.center.y,
                this.cursorX,
                this.cursorY,
            ) + (Math.PI / 1.3);
        }
        // }

        if (this.attacking && this.gameStatus === 'event1') {
            // console.log("aa")
            if (!this.attackingLoop) {
                this.attackingLoop = true
                this.attackingLoopEvent = this.time.addEvent({
                    delay: 20, callback: () => {
                        if (this.swordRange < 100) {
                            this.swordRange += 4
                        }
                        else {
                            this.swordRange = 50
                        }
                    }, callbackScope: this, loop: true
                });
            }
        }

        Phaser.Actions.RotateAroundDistance([this.sword], this.player, this.sword.rotation - oldAngle, this.swordRange);





        if (this.keySPACE.isDown) {
            this.event1loop.destroy()


            console.log(this.sword.rotation)
            // this.cursorX = this.cursorX + 0.1

            this.cursorX = this.cursorX = this.cursorX + 0.1
            // console.log(this.attackingLoopEvent)
            // if (this.attackingLoopEvent) this.attackingLoopEvent.remove();

            // if (this.gameStatus !== 'ready') {
            //     this.events.emit('reset')
            //     // this.gameStatus = "ready"
            //     console.log("antes")
            //     console.log(this.events)

            //     // this.events.off();
            //     // this.events.reset()
            //     // console.log("despues")
            //     // console.log(this.events)
            //     // this.scene.restart();
            //     this.scene.restart({ level: this.currentLevel + 1 })
            //     // this.reset()
            // }

            // if (this.gameStatus !== 'ready') {
            //     this.scene.start('gamemenu')


            // }

            // this.events.emit('lose')




            // this.foeCursorX = this.player.body.center.x
            // this.foeCursorY = this.player.body.center.y

            // this.physics.moveTo(this.foeContainer, this.foeCursorX, this.foeCursorY, 500)
            // this.foeAttacking = true
            // this.event1loop.destroy()



            // this.physics.moveToObject(this.foe, this.container, 200);
            // this.temporalX = this.player.body.center.x
            // this.temporalY = this.player.body.center.y
            // this.physics.moveTo(this.foe, this.temporalX, this.temporalY, 200)
            // console.log(this.foe.x, this.foe.y)

        }


        // this.player.setVelocityX(0)
        // this.player.setVelocity(0)
        this.container.body.setVelocityX(0)
        this.container.body.setVelocityY(0)
        // de 200 subo a 320

        if (this.gameStatus === 'event1') {
            if (this.keyA.isDown) {
                this.container.body.setVelocityX(-320)
                this.player.flipX = true


            } else if (this.keyD.isDown) {

                this.container.body.setVelocityX(320)
                this.player.flipX = false

            }
            if (this.keyS.isDown) {


                this.container.body.setVelocityY(320)



            }
            else if (this.keyW.isDown) {
                this.container.body.setVelocityY(-320)

            }


            // if (this.keyW.isDown || this.keyA.isDown || this.keyS.isDown || this.keyD.isDown) {
            //     this.player.play('knightRunAnim', true)
            // }
            // else {
            //     // knightIdle  knightIdleAnim

            //     // this.player.anims.stop()
            //     // this.player.setFrame('knightIdle')

            //     this.player.play('knightIdleAnim', true)


            // }
            if (this.container.body.velocity.x || this.container.body.velocity.y) {
                this.player.play('knightRunAnim', true)

            }
            else {
                this.player.play('knightIdleAnim', true)

            }

        }



        // if(this.player.body.velocity)
        // .play('knightRunAnim')
        // para no correr mas en diagonal
        // this.player.body.velocity.normalize().scale(50);



        // var collider = this.physics.add.overlap(clown, block, function (clownOnBlock) {
        //     clownOnBlock.body.stop();

        //     this.physics.world.removeCollider(collider);
        // }, null, this);




        //-- FOE

        if (this.foeContainer.body.velocity.x || this.foeContainer.body.velocity.y) {
            if (this.foeContainer.body.velocity.x < 0) {
                this.foe.flipX = true

            }
            else {
                this.foe.flipX = false

            }
            this.foe.play('foeRunAnim', true)
        }
        else {
            this.foe.play('foeIdleAnim', true)
            this.foeAttacking = false

        }

        let FoeOldAngle = this.foeSword.rotation
        if ((this.foeCursorX - this.foe.body.center.x) > 10 || (this.cursorX - this.foe.body.center.x) < -10 || (this.foeCursorY - this.foe.body.center.y) > 10 || (this.foeCursorY - this.foe.body.center.y) < -10) {
            this.foeSword.rotation = Phaser.Math.Angle.Between(
                this.foe.body.center.x,
                this.foe.body.center.y,
                this.foeCursorX,
                this.foeCursorY,
            ) + (Math.PI / 1.3);
        }

        // if (this.attacking) {
        //     console.log("aa")

        //     if (this.foeSwordRange < 100) {
        //         this.foeSwordRange += 0.4
        //     }
        //     else {
        //         this.foeSwordRange = 50
        //     }

        // }

        if (this.foeContainer.x > (this.foeCursorX - 5) && this.foeContainer.x < (this.foeCursorX + 5) && this.foeContainer.y > (this.foeCursorY - 5) && this.foeContainer.y < (this.foeCursorY + 5)) {
            this.foeCursorX = this.player.body.center.x
            this.foeCursorY = this.player.body.center.y
            this.time.delayedCall(300, () => {

                this.foeContainer.body.stop()
            }, [], this)
            // this.foeContainer.body.stop();
        }

        // dejar de atacar cuando esta cerca de tal
        if (this.foeContainer.x > (this.foeCursorX - 16) && this.foeContainer.x < (this.foeCursorX + 16) && this.foeContainer.y > (this.foeCursorY - 16) && this.foeContainer.y < (this.foeCursorY + 16)) {
            // this.foeContainer.body.stop();
            this.foeAttacking = false
        }
        Phaser.Actions.RotateAroundDistance([this.foeSword], this.foe, this.foeSword.rotation - FoeOldAngle, 50);




    }
}




                // this.swordRange = 55
                // this.time.delayedCall(50, () => {
                //     this.swordRange = 65
                // }, [], this)
                // this.time.delayedCall(100, () => {
                //     this.swordRange = 80
                // }, [], this)
                // this.time.delayedCall(150, () => {
                //     this.swordRange = 90
                // }, [], this)
                // this.time.delayedCall(200, () => {
                //     this.swordRange = 100
                //     this.attackingLoop = false
                // }, [], this)