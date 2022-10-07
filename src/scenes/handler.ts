import {Scene} from 'phaser';
import SceneExtraRecord from '../utils/sceneExtraRecord';
import {sceneRecords, screenBaseSize} from '~/main';

export default class Handler extends Phaser.Scene {
    // Vars
    private sceneRunning: string = '';

    public constructor() {
        super('handler');
    }

    private create() {
        this.cameras.main.setBackgroundColor('#FFF')
        this.launchScene('preload')
        this.launchScene('hub')
    }

    private launchScene(scene: string, data: any = {}) {
        this.scene.launch(scene, data)
    }

    private updateResize(scene: Scene) {
        scene.scale.on('resize', this.resize, scene)

        const scaleWidth = scene.scale.gameSize.width
        const scaleHeight = scene.scale.gameSize.height

        let record = sceneRecords.get(scene);
        if(!record) {
            record = new SceneExtraRecord();
            sceneRecords.set(scene, record);
        }

        record.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight);
        record.sizer = new Phaser.Structs.Size(scene.scale.width, scene.scale.height, Phaser.Structs.Size.FIT, record.parent);

        record.parent.setSize(scaleWidth, scaleHeight);
        record.sizer.setSize(scaleWidth, scaleHeight);

        this.updateCamera(scene)
    }

    resize(gameSize: Phaser.Structs.Size) {
        const scene = sceneRecords.get(this);
        // 'this' means to the current scene that is running
        if (scene && !scene.sceneStopped) {
            const width = gameSize.width
            const height = gameSize.height

            const resizeRecord = sceneRecords.get(this);
            if(!resizeRecord) return;

            resizeRecord.parent.setSize(width, height);
            resizeRecord.sizer.setSize(width, height);

            // updateCamera - TO DO: Improve the next code because it is duplicated
            const camera = this.cameras.main
            const scaleX = resizeRecord.sizer.width / screenBaseSize.width
            const scaleY = resizeRecord.sizer.height / screenBaseSize.height

            camera.setZoom(Math.max(scaleX, scaleY))
            camera.centerOn(screenBaseSize.width / 2, screenBaseSize.height / 2)
        }
    }

    private updateCamera(scene: Scene) {
        const resizeRecord = sceneRecords.get(scene);
        if(!resizeRecord) return;

        const camera = scene.cameras.main
        const scaleX = resizeRecord.sizer.width / screenBaseSize.width
        const scaleY = resizeRecord.sizer.height / screenBaseSize.height

        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(screenBaseSize.width / 2, screenBaseSize.height / 2)
    }

}
