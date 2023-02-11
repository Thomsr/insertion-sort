import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { Rect, Node, Line, Text, Layout} from '@motion-canvas/2d/lib/components/'
import {Color, Vector2} from '@motion-canvas/core/lib/types';
import { createRef, useDuration } from '@motion-canvas/core/lib/utils';
import { easeInOutCubic, tween } from '@motion-canvas/core/lib/tweening';
import { all, waitFor, waitUntil } from '@motion-canvas/core/lib/flow';
import { Array } from '../../components/ArrayComponent/Array'
import { Colors } from '../../styles/styles';

export default makeScene2D(function* (view) {
  const ArrayRef = createRef<Array>();
  const ArrayVal = [3, 4, 2, 7, 8]

  const GeneralRef = createRef<Text>();
  const TextRef = createRef<Text>();
    
  const textStyle = {
    paddingTop: 10,
    fontFamily: 'JetBrains Mono',
    fill: 'rgba(255, 255, 255, 0.6)',
  };

  view.add(
    <>
      <Array
        ref={ArrayRef}
        values={ArrayVal}
      />
        <Text 
          ref={GeneralRef}
          text={"GENERAL CONCEPT:"}
          y={-300}
          fontWeight={700}
          opacity={0}
          {...textStyle}
        />
          <Rect alignItems={'start'} 
            justifyContent={'center'}
          >
          <Text 
            ref={TextRef}
            text={""}
            
            textWrap={'pre'}
            fontSize={30}
            {...textStyle}
            />
          </Rect>
    </>
  );

  for(let i = 0; i < ArrayVal.length; i++){
    ArrayRef().boxArray[i].opacity(0);
  }

  yield* waitUntil('Begin1');
    for(let i = 0; i < ArrayVal.length; i++){
        ArrayRef().boxArray[i].position.y(-50);
        yield* all(
            tween(.4, y => {
                ArrayRef().boxArray[i].position(
                    Vector2.lerp(
                        new Vector2(ArrayRef().boxArray[i].position.x(), ArrayRef().boxArray[i].position.y()),
                        new Vector2(ArrayRef().boxArray[i].position.x(), 0),
                        easeInOutCubic(y),
                    )
                )
            }),
            ArrayRef().boxArray[i].opacity(1, .4),
        )
    }
  yield* waitFor(.2);
  yield* all(
    ArrayRef().boxArray[2].position([ArrayRef().boxArray[0].position.x(), (128+28)], .5),
    ArrayRef().HighLight(2, .5, new Color(Colors.green)),
  )
  yield* waitFor(.2);
  yield* all(
    ArrayRef().boxArray[0].position([ArrayRef().boxArray[1].position.x(), (128+28)], .5),
    ArrayRef().HighLight(0, .5, new Color(Colors.green)),
  )
  yield* waitFor(.2);
  yield* all(
    ArrayRef().boxArray[1].position([ArrayRef().boxArray[0].position.x() + 128 + 28, (128+28)], .5),
    ArrayRef().HighLight(1, .5, new Color(Colors.green)),
  )

  yield* waitFor(.2);
  yield* all(
    ArrayRef().boxArray[3].position.y(128+28, .5),
    ArrayRef().HighLight(3, .5, new Color(Colors.green)),
  )

  yield* waitFor(.2);
  yield* all(
    ArrayRef().boxArray[4].position.y(128+28, .5),
    ArrayRef().HighLight(4, .5, new Color(Colors.green)),
  )

  // Back
  yield* waitFor(.4);
  yield* all(
    ArrayRef().boxArray[2].position([ArrayRef().boxArray[1].position.x(), 0], .3),
    ArrayRef().deHighLight(2, .3, new Color(Colors.green)),
  )
  yield* waitFor(.4);
  yield* all(
    ArrayRef().boxArray[0].position([ArrayRef().boxArray[0].position.x() - 128 - 28, 0], .3),
    ArrayRef().deHighLight(0, .3, new Color(Colors.green)),
  )
  yield* waitFor(.4);
  yield* all(
    ArrayRef().boxArray[1].position([ArrayRef().boxArray[0].position.x() + 128 + 28, 0], .3),
    ArrayRef().deHighLight(1, .3, new Color(Colors.green)),
  )

  yield* waitFor(.4);
  yield* all(
    ArrayRef().boxArray[3].position.y(0, .3),
    ArrayRef().deHighLight(3, .3, new Color(Colors.green)),
  )

  yield* waitFor(.4);
  yield* all(
    ArrayRef().boxArray[4].position.y(0, .3),
    ArrayRef().deHighLight(4, .3, new Color(Colors.green)),
  )

  yield* waitUntil('Iterating');
  yield* ArrayRef().HighLight(0, .5, new Color(Colors.green));
  yield* ArrayRef().HighLight(1, .5, new Color(Colors.green));
  for(let i = 2; i < ArrayVal.length; i++){
    yield* ArrayRef().deHighLight(i-2, .5, new Color(Colors.green));
    yield* ArrayRef().HighLight(i, .5, new Color(Colors.green));
  }
  yield* ArrayRef().deHighLight(ArrayVal.length-2, .5, new Color(Colors.green));
  yield* ArrayRef().deHighLight(ArrayVal.length-1, .5, new Color(Colors.green));

  yield* waitUntil('Current');
  yield* ArrayRef().HighLight(2, .5, new Color(Colors.blue));

  yield* waitUntil('Before');
  yield* ArrayRef().HighLight(1, .5, new Color(Colors.blue));

  yield* waitUntil('Swaps');
  yield* ArrayRef().Swap(1, 2, true, 1);
  yield* waitFor(.2);
  yield* all(
    ArrayRef().deHighLight(1, .5, new Color(Colors.blue)),
    ArrayRef().deHighLight(2, .5, new Color(Colors.blue)),
  )

  yield* waitUntil('H');
  yield* ArrayRef().HighLight(1, .5, new Color(Colors.blue));
  yield* ArrayRef().HighLight(0, .5, new Color(Colors.blue));

  yield* waitUntil('Swaps1')
  yield* ArrayRef().Swap(0, 1, true, .7);
  yield* waitFor(.2);
  yield* all(
    ArrayRef().deHighLight(0, .5, new Color(Colors.blue)),
    ArrayRef().deHighLight(1, .5, new Color(Colors.blue)),
  )
  yield* waitUntil('H2');
  yield* ArrayRef().HighLight(0, .5, new Color(Colors.green));
  
  yield* waitFor(.2);
  yield ArrayRef().opacity(0, 0.7);

  yield* waitUntil('General');
  yield GeneralRef().opacity(1, .5)

  yield* waitUntil('1');
  yield* TextRef().text("   - Start by assuming that the first element of the array is sorted.", useDuration('1Time'))

  
  yield* waitUntil('2');
  yield* TextRef().text("   - Start by assuming that the first element of the array is sorted.\n"+
    "- For each subsequent element in the array, compare it to the elements that come before it.", useDuration('2Time'))

  yield* waitUntil('3text');
  yield* TextRef().text("   - Start by assuming that the first element of the array is sorted.\n"+
    "- For each subsequent element in the array, compare it to the elements that come before it.\n" +
    "- If the current element is smaller than the elements that come before it,\n  swap it with the first element that is larger than it.", useDuration('3Time'))

  yield* waitUntil('4text');
  yield* TextRef().text("   - Start by assuming that the first element of the array is sorted.\n"+
    "- For each subsequent element in the array, compare it to the elements that come before it.\n" +
    "- If the current element is smaller than the elements that come before it,\n  swap it with the first element that is larger than it.\n" +
    "- Repeat the process until the current element is in the correct position.", useDuration('4Time'))

  yield* waitUntil('5text');
  yield* TextRef().text("   - Start by assuming that the first element of the array is sorted.\n"+
    "- For each subsequent element in the array, compare it to the elements that come before it.\n" +
    "- If the current element is smaller than the elements that come before it,\n  swap it with the first element that is larger than it.\n" +
    "- Repeat the process until the current element is in the correct position.\n" +
    "- Move on to the next unsorted element and repeat the process.", useDuration('5Time'))
  

  yield* waitUntil('Next');
});
