const COLS = 10;
const ROWS = 18;
const CELL = 20;

const SHAPES = {
    I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    O: [[1, 1], [1, 1]],
    T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
};

const COLORS = {
    I: 0x3987e5, O: 0xfab219, T: 0x9085e9,
    S: 0x0ca30c, Z: 0xe66767, J: 0x2a78d6, L: 0xd95926,
};

function rotateMatrix(m) {
    const n = m.length;
    const res = Array.from({ length: n }, () => Array(n).fill(0));
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            res[c][n - 1 - r] = m[r][c];
        }
    }
    return res;
}

function randomType() {
    const types = Object.keys(SHAPES);
    return types[Math.floor(Math.random() * types.length)];
}

let PhaserLib = null;
let activeGame = null;

function createSceneClass(Phaser, onScore) {
    return class PatternBreakScene extends Phaser.Scene {
    constructor() {
        super('PatternBreak');
        this.onScore = onScore;
    }

    create() {
        this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
        this.score = 0;
        this.lines = 0;
        this.dropDelay = 700;
        this.graphics = this.add.graphics();

        this.scoreText = this.add.text(4, 4, '', { fontSize: '13px', color: '#ffffff', fontFamily: 'system-ui, sans-serif' });

        this.spawn();

        this.input.keyboard.on('keydown-LEFT', () => this.move(-1, 0));
        this.input.keyboard.on('keydown-RIGHT', () => this.move(1, 0));
        this.input.keyboard.on('keydown-DOWN', () => this.move(0, 1));
        this.input.keyboard.on('keydown-UP', () => this.rotate());
        this.input.keyboard.on('keydown-SPACE', () => this.rotate());

        this.dropTimer = this.time.addEvent({
            delay: this.dropDelay,
            loop: true,
            callback: () => this.tick(),
        });

        this.draw();

        this.game.patternBreak = {
            move: (dx, dy) => this.move(dx, dy),
            rotate: () => this.rotate(),
            drop: () => this.hardDrop(),
        };
    }

    spawn() {
        const type = randomType();
        this.piece = {
            type,
            matrix: SHAPES[type].map((row) => [...row]),
            row: 0,
            col: Math.floor((COLS - SHAPES[type].length) / 2),
        };
        if (this.collides(this.piece.matrix, this.piece.row, this.piece.col)) {
            this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
        }
    }

    collides(matrix, row, col) {
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix.length; c++) {
                if (!matrix[r][c]) continue;
                const br = row + r;
                const bc = col + c;
                if (bc < 0 || bc >= COLS || br >= ROWS) return true;
                if (br >= 0 && this.board[br][bc]) return true;
            }
        }
        return false;
    }

    move(dx, dy) {
        if (!this.piece) return;
        const newRow = this.piece.row + dy;
        const newCol = this.piece.col + dx;
        if (!this.collides(this.piece.matrix, newRow, newCol)) {
            this.piece.row = newRow;
            this.piece.col = newCol;
            this.draw();
        } else if (dy > 0) {
            this.lock();
        }
    }

    rotate() {
        if (!this.piece) return;
        const rotated = rotateMatrix(this.piece.matrix);
        for (const shift of [0, -1, 1, -2, 2]) {
            if (!this.collides(rotated, this.piece.row, this.piece.col + shift)) {
                this.piece.matrix = rotated;
                this.piece.col += shift;
                this.draw();
                return;
            }
        }
    }

    hardDrop() {
        if (!this.piece) return;
        while (!this.collides(this.piece.matrix, this.piece.row + 1, this.piece.col)) {
            this.piece.row += 1;
        }
        this.lock();
    }

    tick() {
        this.move(0, 1);
    }

    lock() {
        const { matrix, row, col, type } = this.piece;
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix.length; c++) {
                if (matrix[r][c] && row + r >= 0) {
                    this.board[row + r][col + c] = type;
                }
            }
        }
        this.clearLines();
        this.piece = null;
        this.spawn();
        this.draw();
    }

    clearLines() {
        let cleared = 0;
        for (let r = ROWS - 1; r >= 0; r--) {
            if (this.board[r].every((cell) => cell)) {
                this.board.splice(r, 1);
                this.board.unshift(Array(COLS).fill(null));
                cleared += 1;
                r += 1;
            }
        }
        if (cleared > 0) {
            this.lines += cleared;
            this.score += [0, 100, 300, 500, 800][cleared];
            this.dropDelay = Math.max(250, 700 - this.lines * 15);
            this.dropTimer.delay = this.dropDelay;
            this.scoreText.setText(`Score ${this.score}   Lines ${this.lines}`);
            this.onScore && this.onScore({ score: this.score, lines: this.lines });
        }
    }

    draw() {
        const g = this.graphics;
        g.clear();
        g.fillStyle(0x0d0d0d, 1);
        g.fillRect(0, 0, COLS * CELL, ROWS * CELL);

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (this.board[r][c]) {
                    this.drawCell(g, r, c, COLORS[this.board[r][c]]);
                }
            }
        }
        if (this.piece) {
            const { matrix, row, col, type } = this.piece;
            for (let r = 0; r < matrix.length; r++) {
                for (let c = 0; c < matrix.length; c++) {
                    if (matrix[r][c]) this.drawCell(g, row + r, col + c, COLORS[type]);
                }
            }
        }

        g.lineStyle(1, 0x2c2c2a, 0.5);
        for (let c = 0; c <= COLS; c++) {
            g.lineBetween(c * CELL, 0, c * CELL, ROWS * CELL);
        }
        for (let r = 0; r <= ROWS; r++) {
            g.lineBetween(0, r * CELL, COLS * CELL, r * CELL);
        }

        this.scoreText.setText(`Score ${this.score}   Lines ${this.lines}`);
    }

    drawCell(g, r, c, color) {
        if (r < 0) return;
        g.fillStyle(color, 1);
        g.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
    }
    };
}

export async function mountPatternBreak(container, onScore) {
    if (!PhaserLib) {
        PhaserLib = (await import('../../vendor/phaser.esm.js')).default;
    }
    unmountPatternBreak();

    const SceneClass = createSceneClass(PhaserLib, onScore);

    const config = {
        type: PhaserLib.AUTO,
        width: COLS * CELL,
        height: ROWS * CELL,
        parent: container,
        backgroundColor: '#0d0d0d',
        scene: SceneClass,
    };

    activeGame = new PhaserLib.Game(config);
    return activeGame;
}

export function controlPatternBreak(action) {
    if (!activeGame || !activeGame.patternBreak) return;
    if (action === 'left') activeGame.patternBreak.move(-1, 0);
    if (action === 'right') activeGame.patternBreak.move(1, 0);
    if (action === 'down') activeGame.patternBreak.move(0, 1);
    if (action === 'rotate') activeGame.patternBreak.rotate();
    if (action === 'drop') activeGame.patternBreak.drop();
}

export function unmountPatternBreak() {
    if (activeGame) {
        activeGame.destroy(true);
        activeGame = null;
    }
}
