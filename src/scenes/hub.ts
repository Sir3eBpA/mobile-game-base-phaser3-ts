import Phaser, {Scene} from "phaser";
import {sceneRecords} from "~/main";
import Image = Phaser.GameObjects.Image;
import Text = Phaser.GameObjects.Text;
import Handler from "~/scenes/handler";

export default class Hub extends Phaser.Scene {

    // Vars
    private canvasWidth: number = 0;
    private canvasHeight: number = 0;

    private quitBtn: Image|null = null;
    private soundBtn: Image|null = null;
    private fullscreenBtn: Image|null = null;
    private creditsTxt: Text|null = null;

    private handlerScene: Handler|null = null;

    constructor() {
        super('hub');
    }

    preload() {
        // Images
        this.load.image('quit', 'assets/images/quit.png');
        this.load.spritesheet('fullscreen', 'assets/images/fullscreen.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("sound", "assets/images/sound.png", { frameWidth: 48, frameHeight: 48 });
        //---------------------------------------------------------------------->
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;
        this.handlerScene = this.scene.get('handler') as Handler;
        //Orientation
        //this.scale.lockOrientation(this.game.orientation)

        // Bindings
        this.creditsTxt = this.add.text(this.canvasWidth / 2, this.canvasHeight - 22, 'Shimozurdo Games 2021', { fontFamily: 'Arial', fontSize: '18px', color: '#000', }).setOrigin(.5).setDepth(1)
    }

    create() {

        let posItemHubBase = 32
        this.quitBtn = this.add.image(posItemHubBase, posItemHubBase, "quit").setOrigin(.5).setDepth(1).setInteractive({ cursor: "pointer" })
        this.quitBtn.visible = false

        let multiplePosY = 3
        this.soundBtn = this.add.image(this.canvasWidth - posItemHubBase, posItemHubBase * multiplePosY, "sound").setOrigin(.5).setDepth(1).setInteractive({ cursor: "pointer" })
        this.soundBtn.visible = false

        multiplePosY = 3;
        this.fullscreenBtn = this.add.image(this.canvasWidth - posItemHubBase, posItemHubBase * multiplePosY, "fullscreen", 0).setOrigin(.5).setDepth(1).setInteractive({cursor: "pointer"})

        this.fullscreenBtn.on("pointerup", () => {
            if (!this.fullscreenBtn) return;

            if (this.scale.isFullscreen) {
                this.fullscreenBtn.setFrame(0)
                this.scale.stopFullscreen()
            } else {
                this.fullscreenBtn.setFrame(1)
                this.scale.startFullscreen()
            }
        });

        this.scale.on("resize", this.resize, this)
    }

    clickBackScene(sceneTxt) {
        const scene = this.scene.get(sceneTxt);
        let gotoScene;
        let bgColorScene;

        switch (sceneTxt) {
            case "title":
                if(this.creditsTxt)
                    this.creditsTxt.visible = false
                return
        }

        const sceneExtraRecords = sceneRecords.get(scene);
        if(sceneExtraRecords) {
            sceneExtraRecords.sceneStopped = true
            scene.scene.stop(sceneTxt);
        }

        if(this.handlerScene) {
            this.handlerScene.cameras.main.setBackgroundColor(bgColorScene)
            this.handlerScene.scene.launch(gotoScene);
        }
    }

    resize() {
        if(this.fullscreenBtn)
            this.fullscreenBtn.x = this.scale.gameSize.width - 30;

        if(this.soundBtn)
            this.soundBtn.x = this.scale.gameSize.width - 30;

        if(this.creditsTxt)
            this.creditsTxt.x = this.scale.gameSize.width / 2;

        if(this.creditsTxt)
            this.creditsTxt.y = this.scale.gameSize.height - 30;
    }
}
