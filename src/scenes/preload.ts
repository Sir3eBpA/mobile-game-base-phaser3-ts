import {sceneRecords, screenBaseSize} from "~/main";
import {Scene} from "phaser";
import Handler from "~/scenes/handler";

export default class Preload extends Phaser.Scene {

    private width: number = 0;
    private height: number = 0;

    private handlerScene: Handler|null = null;

    private canvasWidth: number = 0;
    private canvasHeight: number = 0;

    constructor() {
        super('preload');
    }

    preload() {
        // Images
        this.load.image('logo', 'assets/images/logo.png')
        this.load.image('guide', 'assets/images/540x960-guide.png')
        this.load.image('button', 'assets/images/button.png')
        //---------------------------------------------------------------------->
        this.canvasWidth = this.sys.game.canvas.width
        this.canvasHeight = this.sys.game.canvas.height

        this.width = screenBaseSize.width
        this.height = screenBaseSize.height

        const thisScene = sceneRecords.get(this);
        if(thisScene) {
            thisScene.sceneStopped = false;
        }

        this.handlerScene = this.scene.get('handler') as Handler;
        this.handlerScene.sceneRunning = 'preload';

        let progressBox = this.add.graphics()
        progressBox.fillStyle(0x000, 0.8)
        progressBox.fillRect((this.canvasWidth / 2) - (210 / 2), (this.canvasHeight / 2) - 5, 210, 30)
        let progressBar = this.add.graphics()

        this.load.on('progress', (value) => {
            progressBar.clear()
            progressBar.fillStyle(0xFF5758, 1)
            progressBar.fillRect((this.canvasWidth / 2) - (200 / 2), (this.canvasHeight / 2), 200 * value, 20)
        })

        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()
            this.time.addEvent({
                delay: 40000,
                callback: () => {

                    if(thisScene)
                        thisScene.sceneStopped = true

                    this.scene.stop('preload')

                    if(this.handlerScene) {
                        this.handlerScene.cameras.main.setBackgroundColor("#020079")
                        this.handlerScene.scene.launch('title');
                    }
                },
                loop: false
            })
        })
    }

    create() {
        const { width, height } = this
        // CONFIG SCENE
        if(this.handlerScene)
            this.handlerScene.updateResize(this);

        this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        // CONFIG SCENE

        // GAME OBJECTS
        this.add.image(width / 2, height / 2, 'logo').setOrigin(.5)
        // GAME OBJECTS
    }
}
