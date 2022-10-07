import Phaser, {Scene} from 'phaser';
import SceneExtraRecord from "./utils/sceneExtraRecord";
import Handler from "./scenes/handler";

export const sceneRecords: Map<Scene, SceneExtraRecord> = new Map<Phaser.Scene, SceneExtraRecord>();

// Aspect Ratio 16:9 - Portrait
export const MAX_SIZE_WIDTH_SCREEN = 1920
export const MAX_SIZE_HEIGHT_SCREEN = 1080
export const MIN_SIZE_WIDTH_SCREEN = 270
export const MIN_SIZE_HEIGHT_SCREEN = 480
export const SIZE_WIDTH_SCREEN = 540
export const SIZE_HEIGHT_SCREEN = 960

export const screenBaseSize = {
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    maxHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    minHeight: MIN_SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game',
        width: SIZE_WIDTH_SCREEN,
        height: SIZE_HEIGHT_SCREEN,
        min: {
            width: MIN_SIZE_WIDTH_SCREEN,
            height: MIN_SIZE_HEIGHT_SCREEN
        },
        max: {
            width: MAX_SIZE_WIDTH_SCREEN,
            height: MAX_SIZE_HEIGHT_SCREEN
        }
    },
    dom: {
        createContainer: true
    },
    scene: [Handler]
}

export const game = new Phaser.Game(config);
