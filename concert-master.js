import { VisualizerFactory } from "./factories/visualizer-factory.js";
import { SoundAnalyser } from "./analyser.js";
import { Synthesizer } from "./synth.js";

const SOURCE_TYPE_SYNTH = "synth";
const SOURCE_TYPE_AUDIO_FILE = "audio_file_upload";

class ConcertMaster {

/**
 * Setupping the application, , with html element to consider for configuration (audio source) and rendering
 * @param {*} canvasElement 
 * @param {*} setupFormElement 
 * @param {*} synthElement 
 * @param {*} keyboardElement 
 * @param {*} audioElement
 */
    constructor(canvasElement, 
        setupFormElement, 
        synthElement, 
        keyboardElement, 
        audioElement,
        inputAudioElement
    ) {

        this.visualizerFactory = new VisualizerFactory();

        this.audioContext = new AudioContext();
        this.setupFormElement = setupFormElement;
        this.audioElement = audioElement;
        this.canvasElement = canvasElement;
        this.synthElement = synthElement;
        this.keyboardElement = keyboardElement;
        this.inputAudioElement = inputAudioElement;
        //setupping EVERYTHING
       
        this.setupAudioGraph(setupFormElement);
        this.setupEvents(setupFormElement);

        this.playFrame();

    }

/**
 * Setup global event listeners
 * @param {*} setupFormElement 
 */
    setupEvents(setupFormElement) {
        this.setupFormElement.addEventListener('change', event => {
            const form = event.currentTarget;
            this.cleanAudioGraph()
                .then(() => {
                this.audioContext = new AudioContext();
                this.setupAudioGraph(form);
            });
        });

        this.inputAudioElement.addEventListener('change', event => {
            this.audioElement.querySelector('#audio_source').setAttribute('src', URL.createObjectURL(this.inputAudioElement.files[0]));
        });
    }

/**
 * TODO : eventual garbage collector
 */
    cleanAudioGraph() {
        return this.audioContext.close();
        //to examinate, is it necessary ? ==> garbage collector
    }

/**
 * Setupping audio source, visualizer from parameters specified 
 * and connect source to audio context and analyser
 * @param {*} form 
 */
    setupAudioGraph(form) {
            this.analyser = new SoundAnalyser(this.audioContext);
            this.setupSynth(this.synthElement, this.keyboardElement);
            this.setupSource(document.getElementById('setup-source').value); //TODO : make it dom independant ?
            this.setupVisualizer(document.getElementById('setup-visualizer').value);
            this.source.connect(this.analyser.getWebAnalyser());
            this.source.connect(this.audioContext.destination);
    }

/**
 * Setupping objects and events for synthesizer
 * @param {*} synthElement 
 * @param {*} keyboardElement 
 */
    setupSynth(synthElement, keyboardElement) {
            this.synthesizer = new Synthesizer(this.audioContext);
            synthElement.addEventListener('change', (event) => {
                this.synthesizer.onChange(event)
            });
            keyboardElement.addEventListener('mouseup', (event) => {
                this.synthesizer.onChange(event);
            });
            keyboardElement.addEventListener('mousedown', (event) => {
                this.synthesizer.onChange(event);
            });
    }

/**
 * Setupping source and its connections to analyser and audioContext
 * @param {*} source 
 */
    setupSource(source) {
        if (source === SOURCE_TYPE_SYNTH) {
            this.synthElement.classList.add('current-source');
            this.audioElement.classList.remove('current-source');
            this.source = this.synthesizer.getSource();
        } else if (source === SOURCE_TYPE_AUDIO_FILE) {
            this.synthElement.classList.remove('current-source');
            this.audioElement.classList.add('current-source');
            this.source = this.audioContext.createMediaElementSource(document.getElementById('audio_source'));
        }

        this.source.connect(this.analyser.getWebAnalyser());
        this.source.connect(this.audioContext.destination);
    }

/**
 * 
 * @param {*} visualizerType 
 */
    setupVisualizer(visualizerType) {
        this.visualizer = this.visualizerFactory.create(visualizerType, this.canvasElement);
    }

/**
 * Draw data with visualizer
 */
    playFrame() {
       
       requestAnimationFrame(() => this.playFrame());
       if(this.analyser === undefined) {
           return false;
       }
       const soundData = this.analyser.getData();
       this.visualizer.justDrawIt(soundData);
    }
}

export { ConcertMaster };