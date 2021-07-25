let run = false
class grid {
    constructor(x_span, y_span, w = width, h = height, x = 0, y = 0) {
        this.x_span = x_span
        this.y_span = y_span
        this.width = w
        this.height = h
        this.cells = []
        this.next = []
        this.w = this.width / this.x_span
        this.h = this.height / this.y_span
        this.x = x
        this.y = y
        for (let i = 0; i < this.x_span * this.y_span; i++) {
            this.cells.push(new cell(this.x + (i % this.x_span) * this.w, this.y + (Math.floor(i / this.x_span)) * this.h, this.w, this.h))
            this.next.push(false)
        }
        this.running = false
    }
    show() {
        for (let i = 0; i < this.x_span * this.y_span; i++) {
            this.cells[i].show()
        }
    }
    clicked() {
        if (g.running) { return }
        let err = (this.w + this.h) / 4
        let x = mouseX
        let y = mouseY
        for (let i = 0; i < this.x_span * this.y_span; i++) {
            let nx = this.x + (i % this.x_span) * this.w + this.w / 2
            let ny = this.y + (Math.floor(i / this.x_span)) * this.h + this.h / 2
            if ((x - nx) ** 2 + (y - ny) ** 2 <= err ** 2) {
                this.cells[i].alive = !this.cells[i].alive
                return
            }
        }
    }
    is_dead() {
        for (let i = 0; i < this.x_span * this.y_span; i++) {
            if (this.cells[i].alive) {
                return false
            }
        }
        run = false
        return true
    }
    is_alive(i) {
        if (i == -1) { return false }
        try {
            if (this.cells[i].alive) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }
    txy(x, y) {
        if (x < 0 || y < 0 || y >= this.y_span || x >= this.x_span) { return -1 }
        return y * this.x_span + x
    }
    neibhor_count(i) {
        let count = 0
        let x = (i % this.x_span)
        let y = (Math.floor(i / this.x_span))
        if (this.is_alive(this.txy(x - 1, y - 1))) {
            count++;
            //console.log(0)
        }
        if (this.is_alive(this.txy(x, y - 1))) {
            count++;
            //console.log(1)
        }
        if (this.is_alive(this.txy(x + 1, y - 1))) {
            count++;
            //console.log(2)
        }

        if (this.is_alive(this.txy(x - 1, y))) {
            count++;
            //console.log(3)
        }
        if (this.is_alive(this.txy(x + 1, y))) {
            count++;
            // console.log(4)
        }

        if (this.is_alive(this.txy(x - 1, y + 1))) {
            count++;
            //console.log(5)
        }
        if (this.is_alive(this.txy(x, y + 1))) {
            count++;
            //console.log(6)
        }
        if (this.is_alive(this.txy(x + 1, y + 1))) {
            count++;
            //console.log(7)
        }

        return count

    }
    update() {
        if (this.is_dead()) { return }
        for (let i = 0; i < this.x_span * this.y_span; i++) {
            let state = this.cells[i].alive
            let c = this.neibhor_count(i)
                //console.log(c, i)
            if (state && c < 2) { this.next[i] = false }
            if (state && c > 3) { this.next[i] = false }
            if (state && (c == 3 || c == 2)) { this.next[i] = true }
            if (!state && c == 3) { this.next[i] = true }
        }
        for (let i = 0; i < this.x_span * this.y_span; i++) { this.cells[i].alive = this.next[i] }
        for (let i = 0; i < this.x_span * this.y_span; i++) { this.next[i] = false }
    }
    clear() {
        for (let i = 0; i < this.x_span * this.y_span; i++) { this.cells[i].alive = false }
    }
}
class cell {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.alive = false
    }
    show() {
        stroke(50)
        fill(0, 0, 0)
        if (this.alive) { noFill() }
        rect(this.x, this.y, this.w, this.h)
        noStroke()
    }
}
let slider;
let button;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0, 'fixed');
    g = new grid(12, 12, 500, 500, width / 2 - 250, 100)
    slider = createSlider(1, 10, 2);
    slider.position(width / 2 - 260, 650);
    slider.style('width', '500px');
    button = createButton('Start/Stop');
    button.position(width / 2 + 250, 650);
    button.mousePressed(startstop);
    textSize(20)
    g.cells[1].alive = true
    g.cells[2].alive = true

    g.cells[11 - 1].alive = true
    g.cells[11 - 2].alive = true

    g.cells[143 - 1].alive = true
    g.cells[143 - 2].alive = true

    g.cells[143 - 11 + 1].alive = true
    g.cells[143 - 11 + 2].alive = true

    g.cells[11 + 12].alive = true
    g.cells[11 + 12 * 2].alive = true
    g.cells[11 + 12 * 3].alive = true
    g.cells[11 + 12 * 4].alive = true
    g.cells[11 + 12 * 5].alive = true
    g.cells[11 + 12 * 6].alive = true
    g.cells[11 + 12 * 7].alive = true
    g.cells[11 + 12 * 8].alive = true
    g.cells[11 + 12 * 9].alive = true
    g.cells[11 + 12 * 10].alive = true

    g.cells[12].alive = true
    g.cells[12 * 2].alive = true
    g.cells[12 * 3].alive = true
    g.cells[12 * 4].alive = true
    g.cells[12 * 5].alive = true
    g.cells[12 * 6].alive = true
    g.cells[12 * 7].alive = true
    g.cells[12 * 8].alive = true
    g.cells[12 * 9].alive = true
    g.cells[12 * 10].alive = true

}


function startstop() {
    run = !run
}

function draw() {
    frameRate(slider.value())
    if (!run) { frameRate(120) }
    background(255, 255, 255);
    fill(0, 0, 0)
    text("speed", width / 2 - 325, 665)
    string = (run == true) ? "state - running " : "state - stopped || click anywhere to change the state"
    text(string.toString(), width / 2 - 250, 50)
    g.show()
    g.running = false
    if (run) {
        g.running = true
        g.update()
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
    g.clicked()
}

function mouseDragged() {
    g.clicked()
}