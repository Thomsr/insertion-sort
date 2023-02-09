import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import { Color, Spacing, Vector2 } from '@motion-canvas/core/lib/types';
import { Rect } from '@motion-canvas/2d/lib/components/'
import { createRef, useLogger } from '@motion-canvas/core/lib/utils';
import { Colors } from '../styles/styles';
import { Array } from '../components/ArrayComponent/Array'
import { createSignal, Signal, SignalValue, SimpleSignal } from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
  const ArrayReference = createRef<Array>();
  const outlineReference = createRef<Rect>();

  const ArrayValues = [4, 5, 6, 3];
  const BoxWidth = createSignal(1);

  view.add(
    <>
      <Array
        ref={ArrayReference}
        values={ArrayValues}
        boxGap={36}
      />
      <Rect
        ref={outlineReference}
        x={() => -(ArrayValues.length/2) * (128 + 36) + BoxWidth() * ((128 + 36) / 2)}
        height={168}
        width={() => BoxWidth() * (128 + 36)}
        stroke={Colors.green}
        lineWidth={6}
        radius={new Spacing(4)}
      >
      </Rect>
    </>
  )

  yield* InsertionSort(ArrayReference(), outlineReference(), BoxWidth);
  yield* waitFor(1);
});

function * updateOutline(Array: Array, Outline: Rect){
  const offSet = 24;
  for(let i = 0; i < Array.values().length; i++){
    if(Array.children()[i].absolutePosition().x < Outline.absolutePosition().x + Outline.size().x /2){
      Array.boxArray[i].position.x(Array.boxArray[i].position.x() - offSet);
      Outline.position.x(Outline.position.x() -  offSet/i)
    }
  }
}

function * InsertionSort(Array: Array, Outline: Rect, BoxWidth: SimpleSignal<number>){
  for(let i = 1; i < Array.values().length; i++){
    yield BoxWidth(i, 1);
    yield* waitFor(1);
    // yield* updateOutline(Array, Outline);
    let j = i;
    while(j > 0){
      yield* all(
        Array.HighLight(j-1, 1, new Color(Colors.blue)),
        Array.HighLight(j, 1, new Color(Colors.blue)),
      );
      waitFor(1);
      if(Array.values()[j-1] > Array.values()[j]){
        yield * Array.Swap(j, j-1, false, 1);
      } else{
        yield* all(
          Array.deHighLight(j-1, 1),
          Array.deHighLight(j, 1),
        );
        break;
      }
      yield* all(
        Array.deHighLight(j-1, 1),
        Array.deHighLight(j, 1),
      );
      j -= 1;
    } 
  }
  yield BoxWidth(Array.values().length, 1);
}
