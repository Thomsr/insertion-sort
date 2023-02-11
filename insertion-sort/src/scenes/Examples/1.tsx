import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Rect, Node, Line, Text } from '@motion-canvas/2d/lib/components/'
import { Color, Spacing, Vector2 } from '@motion-canvas/core/lib/types';
import { createRef } from '@motion-canvas/core/lib/utils';
import { easeInOutCubic, tween } from '@motion-canvas/core/lib/tweening';
import { all, any, waitFor, waitUntil } from '@motion-canvas/core/lib/flow';
import { Array } from '../../components/ArrayComponent/Array'
import { Colors } from '../../styles/styles';
import { createSignal } from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
    const ArrayReference = createRef<Array>();
    const outlineReference = createRef<Rect>();

    const Example1 = createRef<Text>();
    const textStyle = {
        paddingTop: 10,
        fontFamily: 'JetBrains Mono',
        fill: 'rgba(255, 255, 255, 0.6)',
      };

    const ArrayValues = [4, 2, 3, 6, 2];
    const BoxWidth = createSignal(1);

    view.add(
        <Text
            ref={Example1}
            text={"EXAMPLE 1"}
            opacity={0}
            fontSize={100}
            lineHeight={100}
            {...textStyle}
        />
    )

    yield* Example1().opacity(1, .5)
    yield* waitFor(.7);
    yield* Example1().opacity(0, .5)

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
                opacity={0}
            >
            </Rect>
        </>
    )

    for(let i = 0; i < ArrayValues.length; i++){
        ArrayReference().boxArray[i].opacity(0);
    }

    yield* waitUntil('Begin');
    for(let i = 0; i < ArrayValues.length; i++){
        ArrayReference().boxArray[i].position.y(-50);
        yield* all(
            tween(.5, y => {
                ArrayReference().boxArray[i].position(
                    Vector2.lerp(
                        new Vector2(ArrayReference().boxArray[i].position.x(), ArrayReference().boxArray[i].position.y()),
                        new Vector2(ArrayReference().boxArray[i].position.x(), 0),
                        easeInOutCubic(y),
                    )
                )
            }),
            ArrayReference().boxArray[i].opacity(1, .5),
        )
    }
    yield* waitUntil('Beginning');
    yield outlineReference().opacity(1, 1);

    yield* waitUntil('Second');
    yield* ArrayReference().HighLight(1, 1, new Color(Colors.blue));

    yield* waitUntil('First');
    yield* ArrayReference().HighLight(0, 1, new Color(Colors.blue));

    yield* waitUntil('Swap1');
    yield* ArrayReference().Swap(0, 1, true, 1);

    yield* waitUntil('Extend1');
    yield* all(
        ArrayReference().deHighLight(0, .5, new Color(Colors.blue)),
        ArrayReference().deHighLight(1, .5, new Color(Colors.blue)),
    )
    yield BoxWidth(2, 1);

    yield* waitUntil('H3');
    yield* ArrayReference().HighLight(2, .6, new Color(Colors.blue));
    yield* waitUntil('H4');
    yield* ArrayReference().HighLight(1, .6, new Color(Colors.blue));

    yield* waitUntil('Swap2');
    yield* ArrayReference().Swap(1, 2, true, 1);
    yield* waitFor(.2);
    yield* all(
        ArrayReference().deHighLight(1, 1, new Color(Colors.blue)),
        ArrayReference().deHighLight(2, 1, new Color(Colors.blue)),
    )

    yield* waitUntil('H3_1');
    yield* ArrayReference().HighLight(1, .6, new Color(Colors.blue));
    yield* waitUntil('H2');
    yield* ArrayReference().HighLight(0, .6, new Color(Colors.blue));

    yield* waitUntil('deH');
    yield* all(
        ArrayReference().deHighLight(1, .7, new Color(Colors.blue)),
        ArrayReference().deHighLight(0, .7, new Color(Colors.blue)),
    )

    yield* waitUntil('Extend2');
    yield BoxWidth(3, 1);

    yield* waitUntil('H6');
    yield* ArrayReference().HighLight(3, .6, new Color(Colors.blue));
    yield* waitUntil('H4_1');
    yield* ArrayReference().HighLight(2, .6, new Color(Colors.blue));

    yield* waitUntil('deH_1');
    yield* all(
        ArrayReference().deHighLight(3, 1, new Color(Colors.blue)),
        ArrayReference().deHighLight(2, 1, new Color(Colors.blue)),
    )

    yield* waitUntil('Extend3');
    yield BoxWidth(4, 1);

    yield* waitUntil('H2_1')
    yield* any(
        ArrayReference().HighLight(4, 1, new Color(Colors.blue)),
        waitFor(.3),
    )
    yield* ArrayReference().HighLight(3, 1, new Color(Colors.blue));

    yield* waitUntil('Swap3');
    yield* ArrayReference().Swap(3, 4, true, 1);
    yield* waitFor(.2);
    yield* all(
        ArrayReference().deHighLight(4, 1, new Color(Colors.blue)),
        ArrayReference().deHighLight(3, 1, new Color(Colors.blue)),
    )

    yield* waitUntil('H2_2')
    yield* any(
        ArrayReference().HighLight(3, 1, new Color(Colors.blue)),
        waitFor(.3),
    )
    yield* ArrayReference().HighLight(2, 1, new Color(Colors.blue));

    yield* waitUntil('Swap4');
    yield* ArrayReference().Swap(2, 3, true, 1);
    yield* waitFor(.2);
    yield* all(
        ArrayReference().deHighLight(2, 1, new Color(Colors.blue)),
        ArrayReference().deHighLight(3, 1, new Color(Colors.blue)),
    )

    yield* waitUntil('H2_3')
    yield* any(
        ArrayReference().HighLight(2, 1, new Color(Colors.blue)),
        waitFor(.3),
    )
    yield* ArrayReference().HighLight(1, 1, new Color(Colors.blue));

    yield* waitUntil('Swap5');
    yield* ArrayReference().Swap(1, 2, true, 1);
    yield* waitFor(.2);
    yield* all(
        ArrayReference().deHighLight(1, 1, new Color(Colors.blue)),
        ArrayReference().deHighLight(2, 1, new Color(Colors.blue)),
    )

    yield* waitUntil('H2_4')
    yield* any(
        ArrayReference().HighLight(1, 1, new Color(Colors.blue)),
        waitFor(.3),
    )
    yield* ArrayReference().HighLight(0, 1, new Color(Colors.blue));

    yield* waitUntil('deH_2');
    yield* all(
        ArrayReference().deHighLight(0, 1, new Color(Colors.blue)),
        ArrayReference().deHighLight(1, 1, new Color(Colors.blue)),
    )

    yield* waitUntil('Extend4');
    yield BoxWidth(5, 1);

    yield* waitUntil('Everything');
    for(let i = 0; i < ArrayValues.length; i++){
        yield* ArrayReference().HighLight(i, .3, new Color(Colors.green));
    }

    yield* waitUntil('Next');
});
