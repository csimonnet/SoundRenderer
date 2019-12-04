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
            return;
        }

        if(changedElement.classList.contains('synth-key')) {
            console.log('changeFrequency');
            console.log(changedElement.getAttribute('data-key'));
            console.log(this.getFrequencyFromKeyNumber(changedElement.getAttribute('data-key')));
            this.oscillator1.frequency.value = this.getFrequencyFromKeyNumber(changedElement.getAttribute('data-key'));
        }
        console.log(changedElement);
        
    }

    getFrequencyFromKeyNumber(keyNumber) {
        return Math.pow(2, (keyNumber - 49) / 12) * 440;
    }

    getSource()
    {
        return this.oscillator1;
    }

}

export { Synthesizer };