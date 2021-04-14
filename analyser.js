class SoundAnalyser {

    constructor(audioContext) {
        this.audioContext = audioContext;
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 4096;
    }

    getWebAnalyser() {
        return this.analyser;
    }

    getData() {
        var bufferLengthFrequency = this.analyser.frequencyBinCount;
        var bufferLengthTime = this.analyser.fftSize;
        const frequencies = new Float32Array(bufferLengthFrequency);
        const timeData = new Float32Array(bufferLengthTime);
        this.analyser.getFloatFrequencyData(frequencies);
        this.analyser.getFloatTimeDomainData(timeData);
        this.getFrequenciesByIndex(frequencies.length);
        this.logData();
        return {
            frequencies,
            timeData,
            bufferLengthFrequency,
            bufferLengthTime,
            maxDecibels : this.analyser.maxDecibels
        };
    }

    getFrequenciesByIndex(nbIntervals) {
        this.maxFrequency = this.audioContext.sampleRate / 2;
        this.frequenciesByIntervals = this.maxFrequency / nbIntervals;
        this.ranges = [];
        let currentRange = 0;
        for(let i=0; i < nbIntervals; i++) {
            this.ranges.push({
                'min': currentRange,
                'max': currentRange + this.frequenciesByIntervals
            });
            currentRange += this.frequenciesByIntervals;
        }
    }

    getReferenceNotes() {

    }

    getNotesForRange() {

    }

    logData() {
        let logHTML = '<div>Analyzed data : </div>';
        logHTML += '<table><thead><td>Frequency Index</td><td>min</td><td>max</td></thead>';
        for(let indexRange in this.ranges) {
            logHTML += '<tr><td>indexRange</td><td>'+Math.trunc(this.ranges[indexRange].min)+'</td><td>'+Math.trunc(this.ranges[indexRange].max)+'</td></tr>'
        }

        logHTML += '</table>';
        document.getElementById('debug').innerHTML = logHTML;

    }
}

export { SoundAnalyser };