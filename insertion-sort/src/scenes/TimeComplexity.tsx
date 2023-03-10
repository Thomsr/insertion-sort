import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Rect, Node, Line, Text } from '@motion-canvas/2d/lib/components/'
import { Color, Direction, Spacing, Vector2 } from '@motion-canvas/core/lib/types';
import { useRandom ,createRef, useLogger, range, makeRef } from '@motion-canvas/core/lib/utils';
import { createEaseInBack, easeInOutCubic, tween } from '@motion-canvas/core/lib/tweening';
import { all, any, waitFor, waitUntil } from '@motion-canvas/core/lib/flow';
import { Array } from '../components/ArrayComponent/Array'
import { Colors } from '../styles/styles';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { slideTransition } from "@motion-canvas/core/lib/transitions";

export default makeScene2D(function* (view) {
    yield* slideTransition(Direction.Bottom, .5)

    const Title = createRef<Text>();
    const textStyle = {
        paddingTop: 10,
        fontFamily: 'JetBrains Mono',
        fill: 'rgba(255, 255, 255, 0.6)',
      };

    const bigO = createRef<Text>();
    const ArrayRef = createRef<Array>();
    const nRef = createRef<Text>();
    const lineRef = createRef<Line>();

    view.add(
        <> 
            <Text
                ref={Title}
                text={"TIME COMPLEXITY"}
                opacity={0}
                fontSize={100}
                lineHeight={100}
                {...textStyle}
            />
            <Text 
                ref={bigO}
                text={"O()"}
                fontSize={150}
                lineHeight={150}
                {...textStyle}
                opacity={0}
            />
            <Array
                ref={ArrayRef}
                opacity={0}
                values={[1, 2, 5, 3, 8]}
                y={300}
            />
            <Text
                ref={nRef}
                text={"n"}
                {...textStyle}
                y={100}
                opacity={0}
            />
            <Line
                ref={lineRef}
                lineCap={'round'}
                lineWidth={4}
                stroke={Colors.blue}
                points={[[-410, 250],[-410, 200], [-.5, 200], [0, 150], [.5, 200], [410, 200], [410, 250]]}
                opacity={0}
            />
        </>
    )

    yield* Title().opacity(1, .5)
    yield* waitFor(.7);
    yield Title().opacity(0, .5)
    
    yield* waitFor(.2);
    yield bigO().opacity(1, .5)
    yield* waitUntil('O')
    yield bigO().text("O(n^2)", 1)
    yield* waitUntil('n');
    yield* all(
        bigO().position.y(-200, 1),
        ArrayRef().opacity(1, 1),
        nRef().opacity(1, 1.2),
        lineRef().opacity(1, 1.2),
    ) 

    yield* waitUntil('dissappear');
    yield* all(
        bigO().opacity(0, .5),
        ArrayRef().opacity(0, .5),
        nRef().opacity(0, .5),
        lineRef().opacity(0, .5),
    ) 

    yield* waitUntil('list');
    const ArrayVal = [6,5,2,7,8,5,3,3,2,1,5,7,8,4,3,6,7,8,4,3,6,7,8,3,6,9,7,6,5,4,3,6,7,4,3,5,6,7,3,2,5,7,3,8,2,4,6,7,4,5,6,7,5,7,6,6,3,2,8,9,9,0,2,3,4,5,8,3,3,4,5,8,3,9,0,1,2,5,6,8,3,5,3,2,5,9,7,5,4,3,7,8,1];
    view.add(
        <Array
            ref={ArrayRef}
            values={ArrayVal}
        />
    )
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 12; j++){
            ArrayRef().boxArray[i * 12 + j].opacity(0);
            ArrayRef().boxArray[i * 12 + j].position.y(-(540-(28+128)/2) + i * (128+28))
            ArrayRef().boxArray[i * 12 + j].position.x(-(1920 / 2-(128+28+50)/2) + j * (128+28))
        }
    }

    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 12; j++){
            yield* any(
                ArrayRef().boxArray[i * 12 + j].opacity(1, .07),
                waitFor(.03),
            ) 
        }
    }
    yield* waitUntil('Useful');
    yield* ArrayRef().opacity(0, .5)
    yield* waitFor(.4)
    view.add(
        <Array 
            ref={ArrayRef}
            values={[2,4,9,8,5]}
            opacity={0}
        />
    )
    yield* ArrayRef().opacity(1, .5);
    yield* all(
        ArrayRef().HighLight(0, 1, new Color(Colors.green)),
        ArrayRef().HighLight(1, 1, new Color(Colors.green)),
        ArrayRef().HighLight(2, 1, new Color(Colors.green)),
    )
    yield* waitUntil('Done');
    yield* ArrayRef().opacity(0, 1);

    view.add(
        <Array
            ref={ArrayRef}
            values={[1,2,3,4,5,6]}
            opacity={0}
        />
    )
    yield* ArrayRef().opacity(1, .5);
    for(let i = 0; i < 6; i++){
        yield* ArrayRef().HighLight(i, 1, new Color(Colors.green));
    }

    yield* waitUntil('n1')

    yield* all(
        ArrayRef().position.y(-100, 1),
        ArrayRef().deHighLight(0, 1, new Color(Colors.green)),
        ArrayRef().deHighLight(1, 1, new Color(Colors.green)),
        ArrayRef().deHighLight(2, 1, new Color(Colors.green)),
        ArrayRef().deHighLight(3, 1, new Color(Colors.green)),
        ArrayRef().deHighLight(4, 1, new Color(Colors.green)),
        ArrayRef().deHighLight(5, 1, new Color(Colors.green)),
    )

    const O = createRef<Text>();
    view.add(
        <Text 
            ref={O}
            text={"O(N)"}
            y={200}
            opacity={0}
            fontSize={80}
            {...textStyle}
        />
    )

    yield* O().opacity(1, 1);

    yield* waitUntil('However');
    yield* all(
        O().opacity(0, 1),
        ArrayRef().position.y(0, 1),
    )

    yield* waitUntil('Reverse')
    for(let i = 0; i < 3; i++){
        yield* ArrayRef().Swap(i, 6-i-1, true, 1);
    }

    for(let i = 0; i < 6; i++){
        yield* ArrayRef().HighLight(i, 1, new Color(Colors.red));
    }

    yield* waitUntil('n3');
    yield* all(
        ArrayRef().position.y(-100, 1),
        ArrayRef().deHighLight(0, 1, new Color(Colors.red)),
        ArrayRef().deHighLight(1, 1, new Color(Colors.red)),
        ArrayRef().deHighLight(2, 1, new Color(Colors.red)),
        ArrayRef().deHighLight(3, 1, new Color(Colors.red)),
        ArrayRef().deHighLight(4, 1, new Color(Colors.red)),
        ArrayRef().deHighLight(5, 1, new Color(Colors.red)),
    )

    view.add(
        <Text 
            ref={O}
            text={"O(N^2)"}
            y={200}
            opacity={0}
            fontSize={80}
            {...textStyle}
        />
    )

    yield* O().opacity(1, 1);

    yield* waitUntil('Psuedo');
    yield* all(
        ArrayRef().opacity(0, 1),
        O().opacity(0, 1)
    ) 

    const Random = useRandom()
    const Lines: Rect[] = [];
    const Block = createRef<Rect>(); 

    view.add(
        <Rect
            ref={Block}
            paddingTop={28}
            layout
            gap={10}
            direction={'column'}
            alignItems={'start'}
            fill={Colors.surface}
            width={500}
            height={600}
            radius={new Spacing(5)}
            opacity={0}
        >
        {range(22).map(i => (
            <Rect
                ref={makeRef(Lines, i)}
                fill={'#ffffff99'}
                marginLeft={Random.nextInt(0, 3) * 20 + 28}
                width={Random.nextInt(100,400)}
                height={15}
                radius={5}
            />
        ))}
        </Rect>
    )

    yield* Block().opacity(1, 1);
    for(let i = 0; i < 22; i++){
        switch(Random.nextInt(0, 3)){
            case 0: yield* Lines[i].fill(Colors.green, .2); break;    
            case 1: yield* Lines[i].fill(Colors.green, .2); break;    
            case 2: yield* Lines[i].fill(Colors.blue, .2); break;
        }
    }

    yield* waitUntil("Next");
})