class OscilloscopeVisualizator {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext("2d");
        this.context.beginPath();
        this.context.strokeStyle = "white";
    }

    justDrawIt(data) {
        this.context.beginPath();
        this.context.clearRect(0,0, this.canvas.height, this.canvas.width);
        data.frequencies.forEach((amplitude, frequency) => {
            this.context.lineTo(frequency, amplitude);
        });
        this.context.stroke();
    }
}

export { OscilloscopeVisualizator };