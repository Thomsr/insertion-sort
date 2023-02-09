import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import { Color } from '@motion-canvas/core/lib/types';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Colors } from '../styles/styles';
import { Array } from '../components/ArrayComponent/Array'

export default makeScene2D(function* (view) {
  // Create your animations here
  const ArrayReference = createRef<Array>();

  view.add(
    <Array
      ref={ArrayReference}
      values={[1, 3, 6, 2]}
    />
  )

  yield* InsertionSort(ArrayReference());
  yield* waitFor(5);
});

function * InsertionSort(Array: Array){
  for(let i = 1; i < Array.values().length; i++){
    let j = i;
    while(j >= 0 && Array.values()[j-1] > Array.values()[j]){
      yield* all(
        Array.HighLight(j-1, 1, new Color(Colors.blue)),
        Array.HighLight(j, 1, new Color(Colors.blue)),
      )
      yield * Array.Swap(j, j-1, true);
      yield* all(
        Array.deHighLight(j-1, 1),
        Array.deHighLight(j, 1),
      );
      j -= 1;
    }
  }
}
