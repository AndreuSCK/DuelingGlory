import Phaser from 'phaser'
// import asdkjlasdj from './../../public/assets/images/dungeon_tiles2.png'
// import sword2 from '../../public/assets/images/sword2.png'
// import sword2 from './'

export default class Game extends Phaser.Scene {
    constructor() {
        super('preloader')
    }
    preload() {
        //Background
        this.load.image('fondo', './assets/fondo.png')
        this.load.image('title', './assets/title.png')
        this.load.image('blackBG', './assets/blackbg.png')

        this.load.image('startMenu', './assets/start.png')
        this.load.image('creditsMenu', './assets/credits.png')

        this.load.image('repeatAsset', './assets/repeat.png')


        // TILESET
        this.load.tilemapTiledJSON('microDungtiles', './assets/microtiled.json')
        this.load.image('tiles', './assets/dungeon_tiles2.png')



        //--Knight 
        this.load.image('knightIdle', './assets/knightidle0.png')
        //--Foe
        this.load.image('foeIdle', './assets/foeidle0.png')


        //--ANIM PRELOAD
        this.load.spritesheet('knightRunSprite', './assets/knight_run_spritesheet.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('knightIdleSprite', './assets/knight_idle_spritesheet.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 6 });

        this.load.spritesheet('foeRunSprite', './assets/foe_run_spritesheet.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 6 });

        this.load.spritesheet('foeIdleSprite', './assets/foe_idle_spritesheet.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 6 });

        //--Lifebar + Weapons
        this.load.image('lifeBarSprite', './assets/lifebar.png')

        this.load.image('sword', './assets/sword.png')
        this.load.image('sword2', './assets/sword2.png')
        this.load.bitmapFont('arcade', './assets/arcade.png', './assets/arcade.xml')
    }
    create() {


        this.anims.create({
            key: 'knightRunAnim',
            frames: this.anims.generateFrameNumbers('knightRunSprite', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,

        })
        this.anims.create({
            key: 'knightIdleAnim',
            frames: this.anims.generateFrameNumbers('knightIdleSprite', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1,

        })
        this.anims.create({
            key: 'foeRunAnim',
            frames: this.anims.generateFrameNumbers('foeRunSprite', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,

        })
        this.anims.create({
            key: 'foeIdleAnim',
            frames: this.anims.generateFrameNumbers('foeIdleSprite', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1,

        })
        // this.anims.create({
        //     key: 'idleAnim',
        //     frames: [
        //         { key: 'knightIdle', frame: 0 }
        //     ],
        //     frameRate: 1,
        // });

        //-- ANIMATIONS



        // this.anims.create({
        //     key: 'knightRunAnim',
        //     frames: this.anims.generateFrameNames('knightIdle', {
        //         start: 0,
        //         end: 4,
        //         prefix: 'knight_run_anim_f',
        //         // zeroPad: 1,
        //         suffix: '.png'
        //     }),
        //     frameRate: 10,
        //     repeat: -1,
        // })
        // this.anims.create({
        //     key: 'knightRunAnim',
        //     frames: this.anims.generateFrameNumbers('knightIdle', { start: 0, end: 4 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
        //--

        this.scene.start('gamemenu')
    }
}