import { BaseVisualizer, CANVAS_HEIGHT, CANVAS_WIDTH } from './base-visualizer.js';

class ToneVisualizer extends BaseVisualizer {

    //I need to get the length of the audio ?

    justDrawIt(data) {

        this.context.beginPath();
        this.context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.context.stroke();
        this.drawGrid();

        const rangeWidth = CANVAS_WIDTH / data.frequencies.length;
        const minDecibels = -100;
        const scaling = 40;
        data.frequencies.forEach((value, frequency) => {
            document.getElementById('debug').innerText = frequency;
            this.context.beginPath();
            this.context.strokeStyle = this.getToneColor(frequency);
            let decibelRange = minDecibels - data.maxDecibels - scaling;
            let height = (minDecibels - value) * CANVAS_HEIGHT / decibelRange;

            this.context.moveTo(frequency * rangeWidth, CANVAS_HEIGHT);
            this.context.lineTo(frequency * rangeWidth, CANVAS_HEIGHT - height);
            this.context.lineTo((frequency + 1) * rangeWidth, CANVAS_HEIGHT - height);
            this.context.stroke();
        });


    }

    getToneColor(frequency) {

        let baseFrequencies = {
            'A': 440,
            'A#': 446.16,
            'B': 493.88,
            'C': 261.63,
            'C#': 277.18,
            'D': 277.18,
            'D#': 311.13,
            'E': 329.63,
            'F': 349.23,
            'F#': 369.99,
            'G': 392,
            'G#': 415.3
        };

        let colors = {
            'A': "#FF0000",
            'A#': "#FF0000",
            'B': "#00FF00",
            'C': "#0000FF",
            'C#': "#0000FF",
            'D': "#E9E9E9",
            'D#': "#E9E9E9",
            'E': "#FFFF00",
            'F': "#00FFFF",
            'F#': "#00FFFF",
            'G': "#FF00FF",
            'G#': "#FF00FF"
        };

        let marginError = 2;
        for (let note in baseFrequencies) {
            if ((frequency / baseFrequencies[note]) % 2 === 0 || frequency === baseFrequencies[note]){
                return colors[note];
            }
        }
        return "#FFFFFF";
    }

    drawXGrid() {};
    drawYGrid() {};
}

export { ToneVisualizer };