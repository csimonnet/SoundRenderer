import { BaseVisualizer, CANVAS_HEIGHT, CANVAS_WIDTH } from './base-visualizer.js';

class SpectrumVisualizer extends BaseVisualizer {

    justDrawIt(data) {
        this.context.beginPath();
        this.context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.context.stroke();
        this.drawGrid();
        this.context.beginPath();

        const rangeWidth = CANVAS_WIDTH / data.frequencies.length;
        const minDecibels = -100;
        const scaling = 40;
        data.frequencies.forEach((value, frequency) => {
            let amplitude = (value !== -Infinity  || value > minDecibels) ? value : minDecibels;

            let decibelRange = minDecibels - data.maxDecibels - scaling;
            let height = (minDecibels - value) * CANVAS_HEIGHT / decibelRange; 
                        if(value > -40) {
                document.getElementById('debug').innerText = amplitude + "," + decibelRange + "," + height;
            }
            this.context.moveTo(frequency * rangeWidth, CANVAS_HEIGHT);
            this.context.lineTo(frequency * rangeWidth, CANVAS_HEIGHT - height);
            this.context.lineTo((frequency + 1) * rangeWidth, CANVAS_HEIGHT - height);
        });
        this.context.stroke();
    }

    drawXGrid() {};
    drawYGrid() {};
}

export { SpectrumVisualizer };