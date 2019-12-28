import { BaseVisualizer, CANVAS_HEIGHT, CANVAS_WIDTH } from './base-visualizer.js';

class OscillatorVisualizer extends BaseVisualizer {

    justDrawIt(data) {
        this.context.beginPath();
        this.context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.context.stroke();
        this.drawGrid();
        this.context.beginPath();
        this.context.moveTo(0,CANVAS_HEIGHT / 2);
        const timeWidth = CANVAS_WIDTH / data.bufferLengthTime;
        let t = 0;
        data.timeData.forEach((waveform) => {
            this.context.lineTo(t, 200 * (1 - waveform));//make the factor dynamic and think about the sampling
        t += timeWidth;
    });

        this.context.stroke();
    }

    drawGrid() {
        this.drawBorders();
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.context.strokeStyle = "#D93400";
        this.drawXGrid();
        this.drawYGrid();
        this.context.stroke();
        this.context.strokeStyle = "#81FF00";
        this.context.lineWidth = 1;
    }


}

export { OscillatorVisualizer };