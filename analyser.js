class SoundAnalyser {

    //création d'un audio context avec la bonne source
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
    }

    getWebAnalyser() {
        return this.analyser;
    }

    getData() {
        var bufferLength = this.analyser.frequencyBinCount;
        const frequencies = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(frequencies);
        return {
            frequencies
        };
    }
}

export { SoundAnalyser };