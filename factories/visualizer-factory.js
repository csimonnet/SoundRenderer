const TYPE_OSCILLATOR = 'oscillator';
const TYPE_SPECTRUM = 'spectrum';

import { OscillatorVisualizer } from '../visualizers/oscillator-visualizer.js';
import { SpectrumVisualizer } from '../visualizers/spectrum-visualizer.js';

class VisualizerFactory {
    create(visualizerType, canvas) {
        switch (visualizerType) {
            case TYPE_OSCILLATOR: {
                return new OscillatorVisualizer(canvas);
            }
            case TYPE_SPECTRUM: {
                return new SpectrumVisualizer(canvas);
            }
            default: {
                throw `Visualizer ${visualizerType} not implemented (yet)`;
            }
        }
    }
}

export { VisualizerFactory };