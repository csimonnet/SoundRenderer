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

}

export { OscillatorVisualizer };