const OSC_1_WAVE_TYPE = "osc-1-wavetype";

class Synthesizer {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.oscillator1 = this.audioContext.createOscillator();
        this.oscillator1.type = 'sine';
        this.oscillator1.start();
    }

    onChange(event) {
        let changedElement = event.target;
        if (changedElement.id === OSC_1_WAVE_TYPE) {
            this.oscillator1.type = changedElement.value;
        }
    }

    getSource()
    {
        return this.oscillator1;
    }

}

export { Synthesizer };