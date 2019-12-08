import { SpectrumVisualizator } from "./spectrum-visualizator.js";
import { SoundAnalyser } from "./analyser.js";
import { Synthesizer } from "./synth.js";

const SOURCE_TYPE_SYNTH = "synth";

class ConcertMaster {
    constructor(source, visualizatorType, canvasElement, synthElement, keyboardElement) {
        this.audioContext = new AudioContext();
        
        if (source === SOURCE_TYPE_SYNTH) {
            this.synthesizer = new Synthesizer(this.audioContext);
            this.source = this.synthesizer.getSource();
            synthElement.addEventListener('change', (event) => {
                this.synthesizer.onChange(event)
            });
            keyboardElement.addEventListener('mouseup', (event) => {
                this.synthesizer.onChange(event);
            });
            keyboardElement.addEventListener('mousedown', (event) => {
                this.synthesizer.onChange(event);
            });
        } else if (source instanceof HTMLAudioElement) {
            this.source = this.audioContext.createMediaElementSource(source);
        }
        
        switch (visualizatorType) {
            default: 
                this.visualizator = new SpectrumVisualizator(canvasElement);
        }

        this.analyser = new SoundAnalyser(this.audioContext);
        this.source.connect(this.analyser.getWebAnalyser());
        this.source.connect(this.audioContext.destination);
        this.playFrame();

    }

    playFrame() {
       
       requestAnimationFrame(() => this.playFrame());
       if(this.analyser === undefined) {
           return false;
       }
       const soundData = this.analyser.getData();
       this.visualizator.justDrawIt(soundData);
    }
}

export { ConcertMaster };