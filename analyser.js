class SoundAnalyser {

    constructor(audioContext) {
        this.audioContext = audioContext;
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 1024;
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
        return {
            frequencies,
            timeData,
            bufferLengthFrequency,
            bufferLengthTime,
            maxDecibels : this.analyser.maxDecibels
        };
    }
}

export { SoundAnalyser };