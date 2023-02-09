import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import { Color, Spacing, Vector2 } from '@motion-canvas/core/lib/types';
import { Rect } from '@motion-canvas/2d/lib/components/'
import { createRef, useLogger } from '@motion-canvas/core/lib/utils';
import { Colors } from '../styles/styles';
import { Array } from '../components/ArrayComponent/Array'
import { createSignal } from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
  // Create your animations here
  const ArrayReference = createRef<Array>();
  const outlineReference = createRef<Rect>();

  const ArrayValues = [1, 3, 6, 2, 4, 6];
  const BoxWidth = createSignal(2);

  view.add(
    <>
      <Rect
        ref={outlineReference}
        x={() => -(ArrayValues.length/2) * (128 + 28) + BoxWidth() * ((128 + 28) / 2)}
        height={168}
        width={() => BoxWidth() * (128 + 28) + 20}
        stroke={Colors.green}
        lineWidth={8}
        radius={new Spacing(4)}
      >
      </Rect>
      <Array
        ref={ArrayReference}
        values={ArrayValues}
      />
    </>
  )
  yield* updateOutline(ArrayReference(), outlineReference())

  yield* InsertionSort(ArrayReference());
  yield* waitFor(5);
});

function * updateOutline(Array: Array, Outline: Rect){
  for(let i = 0; i < Array.values().length; i++){
    if(Array.boxArray[i].absolutePosition().x < Outline.absolutePosition().x){
      useLogger().debug(i.toString() + ' ' + Array.boxArray[i].absolutePosition() + ' ' + Outline.absolutePosition().x)
      Array.boxArray[i].position.x(Array.boxArray[i].position.x() - 100);
    }
  }
}

function * InsertionSort(Array: Array){
  for(let i = 1; i < Array.values().length; i++){
    let j = i;
    while(j >= 0){
      // yield* all(
      //   Array.HighLight(j-1, .5, new Color(Colors.blue)),
      //   Array.HighLight(j, .5, new Color(Colors.blue)),
      // );

      if(Array.values()[j-1] > Array.values()[j]){
        yield * Array.Swap(j, j-1, true, 0.5);
      } else {
        // yield* all(
        //   Array.deHighLight(j-1, 1),
        //   Array.deHighLight(j, 1),
        // );
        break;
      }
      // yield* all(
      //   Array.deHighLight(j-1, .2),
      //   Array.deHighLight(j, .2),
      // );
      j -= 1;
    } 
  }
}
