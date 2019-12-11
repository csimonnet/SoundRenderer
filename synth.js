const OSC_1_WAVE_TYPE = "osc-1-wavetype";
const OSC_1_DEFAULT_VOLUME = 1;

class Synthesizer {
    
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.oscillator1 = this.audioContext.createOscillator();
        this.oscillator1.type = 'sine';

        this.osc1GainNode = this.audioContext.createGain(); //TODO : à externaliser
        this.oscillator1.connect(this.osc1GainNode);
        this.osc1GainNode.gain.value = 0;

        this.oscillator1.start();
    }

    onChange(event) {
        let changedElement = event.target;
        
        if (changedElement.id === OSC_1_WAVE_TYPE) {
            this.oscillator1.type = changedElement.value;
            return;
        }

        if (changedElement.classList.contains('synth-key')) {
            if (event.type === 'mousedown') {
                this.oscillator1.frequency.value = this.getFrequencyFromKeyNumber(changedElement.getAttribute('data-key'));
                this.osc1GainNode.gain.value = OSC_1_DEFAULT_VOLUME;
            }

            if (event.type === 'mouseup') {
                this.osc1GainNode.gain.value = 0;
            } 
        }
    }

    getFrequencyFromKeyNumber(keyNumber) {
        return Math.pow(2, (keyNumber - 49) / 12) * 440;
    }

    getSource()
    {
        return this.osc1GainNode;
    }

}

export { Synthesizer };