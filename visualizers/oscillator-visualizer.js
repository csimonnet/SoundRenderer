import { BaseVisualizer } from './base-visualizer.js';

class OscillatorVisualizer extends BaseVisualizer {

    justDrawIt(data) {
        this.context.beginPath();
        this.context.clearRect(0,0, 800, 400);
        this.drawGrid();
        this.context.moveTo(0,200);
        const timeWidth = 800 / data.bufferLengthTime;
        let t = 0;
        data.timeData.forEach((waveform) => {
            this.context.lineTo(t, 200 * (1 - waveform));//make the factor dynamic and think about the sampling
            t += timeWidth;
        });

        this.context.stroke();
    }
}

export { OscillatorVisualizer };