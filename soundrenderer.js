import { ConcertMaster } from "./concert-master.js"

const concertMaster = new ConcertMaster(
    'synth', 
    'oscillator', 
    document.getElementById('rendering'),
    document.getElementById('synth-controller'),
    document.getElementById('synth-keyboard')
);