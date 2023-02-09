import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line} from '@motion-canvas/2d/lib/components/'
import {Vector2} from '@motion-canvas/core/lib/types';
import { createRef } from '@motion-canvas/core/lib/utils';
import { easeInOutCubic, tween } from '@motion-canvas/core/lib/tweening';
import { waitFor, waitUntil } from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {

  yield* waitUntil('Next');
});
