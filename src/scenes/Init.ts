import { Scene } from "phaser";
// import { DOWN, LEFT, RIGHT, TOWN, UP } from "@constants/directions";
import { IMAGE_MAIN, IMAGE_PLAYER, MAP_MAIN } from "@constants/assets";
import { INIT, TYPE_MAIN } from "@constants/scenes";
import { LEFT, RIGHT, UP, DOWN } from "@constants/directions";

class Init extends Scene {
  progressBar: Phaser.GameObjects.Graphics | null;
  progressCompleteRect: Phaser.Geom.Rectangle | null;
  progressRect: Phaser.Geom.Rectangle | null;

  constructor() {
    super({ key: INIT });
    this.progressBar = null;
    this.progressCompleteRect = null;
    this.progressRect = null;
  }

  preload() {
    //this.load.tilemapTiledJSON(MAP_MAIN, "./src/assets/maps/main.json");
    this.load.tilemapTiledJSON(
      MAP_MAIN,
      "https://d1myusrzlknp8y.cloudfront.net/maps/main.json"
    );

    /*this.load.spritesheet(IMAGE_MAIN, "./src/assets/maps/main.png", {
      frameWidth: 32,
      frameHeight: 32,
    });*/

    this.load.spritesheet(
      IMAGE_MAIN,
      "https://d1myusrzlknp8y.cloudfront.net/maps/main.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    // this.load.spritesheet(IMAGE_PLAYER, "./src/assets/sprites/player.png", {
    //   frameWidth: 32,
    //   frameHeight: 32,
    // });

    this.load.spritesheet(
      IMAGE_PLAYER,
      "https://d1myusrzlknp8y.cloudfront.net/sprites/player.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    /* this.load.audio('music-town', ['assets/music/town.mp3']); */

    this.load.on("progress", this.onLoadProgress, this);
    this.load.on("complete", this.onLoadComplete, this);
    this.createProgressBar();
  }

  create() {
    /*
        this.music = this.sound.add('music-town', { loop: true });
        this.music.play();
    */

    this.anims.create({
      key: LEFT,
      frames: this.anims.generateFrameNumbers(IMAGE_PLAYER, {
        start: 3,
        end: 5,
      }),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: RIGHT,
      frames: this.anims.generateFrameNumbers(IMAGE_PLAYER, {
        start: 6,
        end: 8,
      }),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: UP,
      frames: this.anims.generateFrameNumbers(IMAGE_PLAYER, {
        start: 9,
        end: 11,
      }),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: DOWN,
      frames: this.anims.generateFrameNumbers(IMAGE_PLAYER, {
        start: 0,
        end: 2,
      }),
      frameRate: 13,
      repeat: -1,
    });

    document
      .querySelector("canvas")!
      .addEventListener("pointerdown", function () {
        const activeElement = document.activeElement! as HTMLInputElement;

        if (document.activeElement !== document.body) {
          activeElement.setAttribute("readonly", "readonly");
          activeElement.setAttribute("disabled", "true");

          setTimeout(function () {
            activeElement.blur();
            activeElement.removeAttribute("readonly");
            activeElement.removeAttribute("disabled");
          }, 100);
        }
      });
  }

  createProgressBar() {
    let Rectangle = Phaser.Geom.Rectangle;
    let main = Rectangle.Clone(
      this.cameras.main as unknown as Phaser.Geom.Rectangle
    );

    this.progressRect = new Rectangle(0, 0, main.width / 2, 50);
    Rectangle.CenterOn(this.progressRect, main.centerX, main.centerY);

    this.progressCompleteRect = Phaser.Geom.Rectangle.Clone(this.progressRect);

    this.progressBar = this.add.graphics();
  }

  onLoadComplete() {
    this.scene.start(TYPE_MAIN);
  }

  onLoadProgress(progress: number) {
    let color = 0xffffff;

    this.progressRect!.width = progress * this.progressCompleteRect!.width;
    this.progressBar!.clear()
      .fillStyle(0x222222)
      .fillRectShape(this.progressCompleteRect!)
      .fillStyle(color)
      .fillRectShape(this.progressRect!);
  }
}

export default Init;
