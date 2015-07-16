var Life = (seed) => {
    this.seed = seed;
    this.height = seed.length;
    this.width = seed[0].length;
    this.current = this.clone(seed);
};

Life.prototype = {
    next: () => {
        this.previous = this.clone(this.current);

        for (var x = 0; x < this.height; x++) {
            for (var y = 0; y < this.width; y++) {
                var neighbors = this.aliveNeighbors(this.previous, x, y);
                var alive = !!this.current[y][x];

                if (alive) {
                    if (neighbors > 3 || neighbors < 2) {
                        this.current[y][x] = 0;
                    }
                } else {
                    if (neighbors === 3) {
                        this.current[y][x] = 1;
                    }
                }
            }
        }

        return this;
    },
    aliveNeighbors: (a, x, y) => {
        var upperRow = a[y - 1] || [];
        var lowerRow = a[y + 1] || [];

        return [
            upperRow[x - 1],
            upperRow[x],
            upperRow[x + 1],
            a[y][x - 1],
            a[y][x + 1],
            lowerRow[x - 1],
            lowerRow[x],
            lowerRow[x + 1]
        ].reduce((p, e) => p + +!!e);
    },
    clone: a => a.slice().map(e => e.slice()),
    toString: () => {
        return this.current.map((row) => row.join(' ')).join('\n');
    }
};

var game = new Life([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]);

console.log(String(game));
console.log('---------');
game.next();
console.log(String(game.toString()));
console.log('---------');
console.log(String(game.next().toString()));
