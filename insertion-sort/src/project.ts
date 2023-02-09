import {makeProject} from '@motion-canvas/core/lib';

import Voice from './../audio/voice.mp4'
import intro from './scenes/Intro/intro?scene'
import introInsertionSort from './scenes/Intro/introInsertionSort?scene';
import firstExample from './scenes/Examples/1?scene'

export default makeProject({
  scenes: [
    intro,
    introInsertionSort,
    firstExample,
  ],
  background: '#141414',
  audio: Voice,
});
 