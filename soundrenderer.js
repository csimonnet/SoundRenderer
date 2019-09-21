import { ConcertMaster } from "./concert-master.js"

const concertMaster = new ConcertMaster(document.getElementById('audio_source'), 'oscillator', document.getElementById('rendering'));