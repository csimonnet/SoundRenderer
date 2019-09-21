import { OscillatorVisualizator } from "./visualizator.js";
import { SoundAnalyser } from "./analyser.js";

const SOURCE_TYPE_SYNTH = "synth";

class ConcertMaster {
    constructor(source, visualizatorType, canvasElement) {
        this.audioContext = new AudioContext();
        
        if (source === SOURCE_TYPE_SYNTH) {
            //initialiser les nodes pour le synthétiseur
        } else if (source instanceof HTMLAudioElement) {
            this.source = this.audioContext.createMediaElementSource(source);
            source.onplay = () => this.playFrame();

        }
        
        switch (visualizatorType) {
            default: 
                this.visualizator = new OscillatorVisualizator(canvasElement);
        }

        this.analyser = new SoundAnalyser(this.audioContext);
        this.source.connect(this.analyser.getWebAnalyser());
        //renvoyer l'audio vers sa destination
        this.source.connect(this.audioContext.destination);

    }

    playFrame() {
       requestAnimationFrame(() => this.playFrame());
       const soundData = this.analyser.getData();
       this.visualizator.justDrawIt(soundData);
    }
}

export { ConcertMaster };