import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, any, waitFor} from '@motion-canvas/core/lib/flow';
import { Color, Direction, Spacing, Vector2 } from '@motion-canvas/core/lib/types';
import { Layout, Line, Node, Rect, Text } from '@motion-canvas/2d/lib/components/'
import { createRef, useLogger } from '@motion-canvas/core/lib/utils';
import { Colors } from '../../styles/styles';
import { Array } from '../../components/ArrayComponent/Array'
import { createSignal, Signal, SignalValue, SimpleSignal } from '@motion-canvas/core/lib/signals';
import { CodeBlock, edit, insert, lines, word }from '@motion-canvas/2d/lib/components/CodeBlock';
import { slideTransition } from '@motion-canvas/core/lib/transitions';

export default makeScene2D(function* (view) {
  yield* slideTransition(Direction.Bottom, 1);

  const Example2 = createRef<Text>();
  const textStyle = {
    paddingTop: 10,
    fontFamily: 'JetBrains Mono',
    fill: 'rgba(255, 255, 255, 0.6)',
  };

  view.add(
    <Text
        ref={Example2}
        text={"EXAMPLE 2"}
        opacity={0}
        fontSize={100}
        lineHeight={100}
        {...textStyle}
    />
  ) 

  yield* Example2().opacity(1, .5)
  yield* waitFor(.7);
  yield* Example2().opacity(0, .5)

  const ArrayReference = createRef<Array>();
  const outlineReference = createRef<Rect>();

  const ArrayValues = [5, 6, 2, 3, 1];
  const BoxWidth = createSignal(1);
  const Code = createRef<CodeBlock>();
  const Pointers = createSignal(0);
  const iRef = createRef<Text>();

  const allRef = createRef<Node>();

  view.add(
    <>
    <Node ref={allRef} opacity={0}>
      <Node x={400}>
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
      </Node>
      <Text
        ref={iRef}
        text={"i = 1"}
        x={400}
        y={160}
        {...textStyle}
      />
      <Layout x={-328 + 400} y={-200} alignItems={'start'}>
          <Text
            text={"j-1"}
            x={() => Pointers() * (128+36)}
            {...textStyle}
          />
          <Text 
            marginLeft={128}
            x={() => Pointers() * (128+36) + 128 + 36}
            text={"j"}
            {...textStyle}
          />
          <Line 
            points={[[0,40], [0, 100]]}
            x={() => Pointers() * (128+36)}
            lineCap={'round'}
            stroke={'#ffffff'}
            opacity={153/256}
            lineWidth={4}
            endArrow
            arrowSize={10}
          />
          <Line 
            points={[[0,40], [0, 100]]}
            x={() => Pointers() * (128+36) + 128 + 36}
            lineCap={'round'}
            stroke={'#ffffff'}
            opacity={153/256}
            lineWidth={4}
            endArrow
            arrowSize={10}
          />
      </Layout>
      <Rect
        offset={-1}
        x={-1100}
        y={-540 + 80}
        height={1080 - 160}
        width={960}
        clip
      >
        <CodeBlock
          ref={Code}
          fontSize={24}
          lineHeight={36}
          fontFamily={'JetBrains Mono'}
          code={"InsertionSort(Array, n)\n  for(i = 1; i < n; i++){\n    j = i\n    while(j > 0 && Array[j-1] > Array[j]){\n      Swap(j-1, j)\n      j--\n    }\n  }"}
          opacity={1}
        />
      </Rect>
      </Node>
    </>
  )

  yield* allRef().opacity(1, 1);
  yield* waitFor(.2);
  yield* InsertionSort(ArrayReference(), outlineReference(), BoxWidth, Code(), Pointers, iRef());
  for(let i = 0; i < ArrayValues.length; i++){
    yield* any(
      waitFor(.5),
      ArrayReference().HighLight(i, 1, new Color(Colors.green))
    )
  }
  yield* waitFor(1);
  yield* allRef().opacity(0, 1);

  view.add(
    <Text
      ref={allRef} 
      text={"Thanks for Watching!"}
      fontSize={80}
      fontWeight={800}
      opacity={0}
      {...textStyle}
    />
  )

  yield* allRef().opacity(1, 1);
  yield* waitFor(10);
});

function * InsertionSort(Array: Array, Outline: Rect, BoxWidth: SimpleSignal<number>, Code: CodeBlock, Pointers: SimpleSignal<number>, iRef: Text){
  for(let i = 1; i < Array.values().length; i++){
    iRef.text("i = " + i.toString())
    yield* Code.selection([[[1, 0], [1, 100]]], .5);
    yield BoxWidth(i, 1);
    yield* waitFor(1);
    let j = i;
    yield* Pointers(j-1, .5);
    yield* Code.selection([[[2, 0], [2, 100]]], .5);
    yield* Code.selection([[[3, 10], [3, 15]]], .5);
    while(j > 0){
      yield* all(
        Code.selection([[[3, 19], [3, 40]]], .5),
        Array.HighLight(j-1, 1, new Color(Colors.blue)),
        Array.HighLight(j, 1, new Color(Colors.blue)),
      );
      waitFor(1);
      if(Array.values()[j-1] > Array.values()[j]){
        yield* all(
          Code.selection([[[4, 0], [4, 100]]], .5),
          Array.Swap(j, j-1, false, 1),
        )
      } else{
        yield* all(
          Array.deHighLight(j-1, 1,new Color(Colors.blue)),
          Array.deHighLight(j, 1,new Color(Colors.blue)),
        );
        break;
      }
      yield* all(
        Array.deHighLight(j-1, 1,new Color(Colors.blue)),
        Array.deHighLight(j, 1,new Color(Colors.blue)),
        Code.selection([[[5, 0], [5, 100]]], .5),
        Pointers(j-1-1, .5),
        );
        j -= 1;
        yield* Code.selection([[[3, 10], [3, 15]]], .5); 
      } 
  }
  yield BoxWidth(Array.values().length, 1);
}
