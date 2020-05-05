const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

class BaseVisualizer {

    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext("2d");
        this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.context.strokeStyle = "#81FF00";
    }

    drawBorders() {
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(CANVAS_WIDTH, 0);
        this.context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
        this.context.lineTo(0, CANVAS_HEIGHT);
        this.context.lineTo(0, 0);
        this.context.stroke();

    }

    drawYGrid() {
        const yinterval = 20;
        let y = yinterval;
        while (y < CANVAS_HEIGHT) {
            this.context.moveTo(0,y);
            this.context.lineTo(CANVAS_WIDTH, y);
            y = y + yinterval;
        }
    }

    drawXGrid() {
        const xinterval = 20;
        let x = xinterval;
        while (x < CANVAS_WIDTH) {
            this.context.moveTo(x,0);
            this.context.lineTo(x, CANVAS_HEIGHT);
            x = x + xinterval;
        }
    }

    drawGrid() {
        
        this.drawBorders();
        this.context.beginPath();
        this.context.strokeStyle = "#D93400";
        this.drawXGrid();
        this.drawYGrid();
        this.context.stroke();
        this.context.strokeStyle = "#81FF00";


    }
}

export { BaseVisualizer, CANVAS_HEIGHT, CANVAS_WIDTH };