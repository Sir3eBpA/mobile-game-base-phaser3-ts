import Phaser from "phaser";

export default class SceneExtraRecord {
    public parent: Phaser.Structs.Size = new Phaser.Structs.Size();
    public sizer: Phaser.Structs.Size = new Phaser.Structs.Size();
    public sceneStopped: boolean = false;
}
