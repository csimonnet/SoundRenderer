import { ConcertMaster } from "./concert-master.js"

const concertMaster = new ConcertMaster(
    document.getElementById('rendering'),
    document.getElementById('setup'),
    document.getElementById('synth-controller'),
    document.getElementById('synth-keyboard'),
    document.getElementById('audio_file'),
    document.getElementById('upload_audio')
);