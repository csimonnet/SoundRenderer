export class Score {

    constructor(scoreCanvas) {
        this.scoreCanvas = scoreCanvas;
        this.context = this.scoreCanvas.getContext("2d");
        console.log('Now I am here');
        this.draw();
    }

    draw() {
        this.context.beginPath();
        this.context.moveTo(0, 40);
        this.context.lineTo(400, 40);
        this.context.moveTo(0, 50);
        this.context.lineTo(400, 50);
        this.context.moveTo(0, 60);
        this.context.lineTo(400, 60);
        this.context.moveTo(0, 70);
        this.context.lineTo(400, 70);
        this.context.moveTo(0, 80);
        this.context.lineTo(400, 80);
        const image = document.getElementById("g-key");
        console.log(image);
        this.context.drawImage(image, 0, 0, 150, 150, 40, 39, 40, 50);
        this.context.stroke();

    }

}