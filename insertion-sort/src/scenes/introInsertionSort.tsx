import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {waitFor} from '@motion-canvas/core/lib/flow';
import { Array } from '../components/Array'

export default makeScene2D(function* (view) {
  // Create your animations here

  view.add(
    <Array
      values={[1,2]}
    >

    </Array>
  )
  yield* waitFor(5);
});
