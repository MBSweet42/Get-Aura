const THOUGHTS = [
    'What if I fail?',
    "They're upset with me",
    "I'm not doing enough",
    'Something bad will happen',
    'I said the wrong thing',
    "I can't handle this",
    'What if I embarrass myself?',
    'I should be better by now',
    "Everyone's watching me",
    'I always mess this up',
];

const TARGET_POPS = 12;
const WIDTH = 300;
const HEIGHT = 420;

function createSceneClass(Phaser, onComplete) {
    return class ThoughtPopperScene extends Phaser.Scene {
        constructor() {
            super('ThoughtPopper');
            this.onComplete = onComplete;
        }

        create() {
            this.bubbles = [];
            this.popped = 0;
            this.completed = false;

            this.countText = this.add.text(10, 10, `Popped 0 / ${TARGET_POPS}`, {
                fontSize: '13px',
                color: '#ffffff',
                fontFamily: 'system-ui, sans-serif',
            });

            this.spawnTimer = this.time.addEvent({
                delay: 1300,
                loop: true,
                callback: () => this.spawnBubble(),
            });

            this.spawnBubble();
        }

        spawnBubble() {
            if (this.completed) return;
            const text = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
            const x = 55 + Math.random() * (WIDTH - 110);
            const y = HEIGHT + 30;
            const radius = 44 + Math.random() * 14;

            const container = this.add.container(x, y);
            const circle = this.add.circle(0, 0, radius, 0x3987e5, 0.22);
            circle.setStrokeStyle(1.5, 0x3987e5, 0.6);
            const label = this.add
                .text(0, 0, text, {
                    fontSize: '11px',
                    color: '#ffffff',
                    fontFamily: 'system-ui, sans-serif',
                    align: 'center',
                    wordWrap: { width: radius * 1.6 },
                })
                .setOrigin(0.5);

            container.add([circle, label]);
            container.setSize(radius * 2, radius * 2);
            container.setInteractive(new Phaser.Geom.Circle(0, 0, radius), Phaser.Geom.Circle.Contains);
            container.on('pointerdown', () => this.pop(container));

            const vy = 18 + Math.random() * 10;
            this.bubbles.push({ container, vy });
        }

        pop(container) {
            if (container.popped) return;
            container.popped = true;
            container.disableInteractive();
            this.popped += 1;
            this.countText.setText(`Popped ${this.popped} / ${TARGET_POPS}`);

            this.tweens.add({
                targets: container,
                scale: 1.4,
                alpha: 0,
                duration: 220,
                onComplete: () => container.destroy(),
            });

            this.bubbles = this.bubbles.filter((b) => b.container !== container);

            if (this.popped >= TARGET_POPS && !this.completed) {
                this.completed = true;
                this.spawnTimer.remove();
                this.time.delayedCall(300, () => this.onComplete && this.onComplete());
            }
        }

        update(time, delta) {
            const dt = delta / 1000;
            this.bubbles.forEach((b) => {
                b.container.y -= b.vy * dt;
            });
            this.bubbles = this.bubbles.filter((b) => {
                if (b.container.y < -60) {
                    b.container.destroy();
                    return false;
                }
                return true;
            });
        }
    };
}

let PhaserLib = null;
let activeGame = null;

export async function mountThoughtPopper(container, onComplete) {
    if (!PhaserLib) {
        PhaserLib = (await import('../../vendor/phaser.esm.js')).default;
    }
    unmountThoughtPopper();

    const SceneClass = createSceneClass(PhaserLib, onComplete);
    const config = {
        type: PhaserLib.AUTO,
        width: WIDTH,
        height: HEIGHT,
        parent: container,
        backgroundColor: '#0d0d0d',
        scene: SceneClass,
    };
    activeGame = new PhaserLib.Game(config);
    return activeGame;
}

export function unmountThoughtPopper() {
    if (activeGame) {
        activeGame.destroy(true);
        activeGame = null;
    }
}
