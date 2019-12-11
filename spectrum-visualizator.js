class SpectrumVisualizator {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext("2d");
        this.context.beginPath();
        this.context.strokeStyle = "#81FF00";
    }

    justDrawIt(data) {
        this.context.beginPath();
        this.context.clearRect(0,0, 400, 800);
        data.frequencies.forEach((amplitude, frequency) => {
            this.context.lineTo(frequency, (400 - amplitude) / 2);
        });
        this.context.stroke();
    }
}

export { SpectrumVisualizator };