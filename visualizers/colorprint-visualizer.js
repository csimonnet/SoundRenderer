import { BaseVisualizer, CANVAS_HEIGHT, CANVAS_WIDTH } from './base-visualizer.js';

class ColorprintVisualizer extends BaseVisualizer {

    justDrawIt(data) {

        document.getElementById('debug').innerText = '';
        this.context.beginPath();
        this.context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.context.stroke();
        let frequencies = this.truncateFrequencies(data.frequencies);

        const rangeWidth = CANVAS_WIDTH / frequencies.length;

        const squareNumberPerLine = Math.round(Math.sqrt(frequencies.length));
        const squareSide = Math.round(CANVAS_HEIGHT / squareNumberPerLine);
        const minDecibels = -75;//todo : all those Arbitrary values :'(

        this.drawGrid(squareSide, squareNumberPerLine);
        frequencies.forEach((value, frequency) => {
            this.context.beginPath();
            let fillFrequency = value > minDecibels;
            document.getElementById('debug').innerText = fillFrequency + ','+ value;
            if (fillFrequency) {
                this.context.fillStyle = this.getColorFromFrequency(frequency, frequencies.length - 1);
                let coordinates = this.getCoordinatesFromIndexFrequency(squareNumberPerLine, squareSide, frequency, frequencies.length);
                this.context.fillRect(coordinates[0], coordinates[1], squareSide, squareSide);
            }
            this.context.stroke();
        });

    }

    truncateFrequencies(frequencies) {
        return frequencies;
    }

    drawGrid(squareSide, squarePerLine) {
        let squareIndex = 0;
        let lineIndex = 0;
        for (lineIndex; lineIndex < squarePerLine + 1; lineIndex++) {
            for (squareIndex = 0; squareIndex < squarePerLine; squareIndex++) {
                this.context.strokeRect(squareIndex*squareSide, lineIndex*squareSide, squareSide, squareSide);
            }
        }
    }

    drawBorders(){}

    getCoordinatesFromIndexFrequency(squarePerLine, squareSide, frequency, maxFrequency)
    {
        const column = (maxFrequency - frequency) % squarePerLine;
        const row = Math.trunc((maxFrequency - frequency) / squarePerLine);
        return [column*squareSide, row*squareSide];
    }

    /**
     * Arbitrary color following available frequencies.
     * @todo: Search for a real correspondance color / sound
     */
    getColorFromFrequency(frequency, maxFrequency)
    {
        const midFrequency = Math.trunc(maxFrequency / 2);
        const quarterFrequency = Math.trunc(maxFrequency/4);
        
        if(frequency < quarterFrequency) {
            const proportionBlue = 0;
            const proportionRed = 255;
            const proportionGreen = (1 - (quarterFrequency - frequency) / quarterFrequency) * 255;
            return `rgb(${proportionRed}, ${proportionGreen}, ${proportionBlue})`;
        }

        if(frequency >= quarterFrequency && frequency < midFrequency) {
            const proportionBlue = 0;
            const proportionGreen = 255;
            const proportionRed = ((midFrequency - frequency) / quarterFrequency) * 255;
            return `rgb(${proportionRed}, ${proportionGreen}, ${proportionBlue})`;
        }

        if(frequency >= midFrequency && frequency < (3*quarterFrequency)) {
            const proportionRed = 0;
            const proportionBlue = (1 - ((3*quarterFrequency) - frequency) / quarterFrequency) * 255;
            const proportionGreen = 255 - proportionBlue;
            return `rgb(${proportionRed}, ${proportionGreen}, ${proportionBlue})`;
        }

        const proportionGreen = 0;
        const proportionBlue = ((maxFrequency - frequency) / 127)*128;
        const proportionRed = 128 - proportionBlue;

        return `rgb(${proportionRed}, ${proportionGreen}, ${proportionBlue})`;

    }
}

export { ColorprintVisualizer };