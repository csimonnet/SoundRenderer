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
        const frequencies = new Uint8Array(bufferLengthFrequency);
        const timeData = new Float32Array(bufferLengthTime);
        this.analyser.getByteFrequencyData(frequencies);
        this.analyser.getFloatTimeDomainData(timeData);
        return {
            frequencies,
            timeData,
            bufferLengthFrequency,
            bufferLengthTime
        };
    }
}

export { SoundAnalyser };