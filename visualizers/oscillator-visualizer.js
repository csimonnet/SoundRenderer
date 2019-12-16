class OscillatorVisualizer {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext("2d");
        this.context.beginPath();
        this.context.strokeStyle = "#81FF00";
    }

    justDrawIt(data) {
        this.context.beginPath();
        this.context.clearRect(0,0, 400, 800);
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