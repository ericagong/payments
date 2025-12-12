// import type { KeyboardEvent } from 'react';

// import useFocusGroup from '@/hooks/atomic/useFocusGroup';
// import type useField from '@/hooks/atomic/useFieldLogic';
// import { shouldNotTrigger, doNothing } from '@/utils';

// type CreateNavigationHandlersParams = {
//   shouldMoveNext?: () => boolean;
//   onMoveNext?: () => void;
//   shouldMovePrev?: () => boolean;
//   onMovePrev?: () => void;
// };

// type NavigationHandlers = {
//   onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
//   onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
// };

// const createNavigationHandlers = ({
//   shouldMoveNext = shouldNotTrigger,
//   onMoveNext = doNothing,
//   shouldMovePrev = shouldNotTrigger,
//   onMovePrev = doNothing,
// }: CreateNavigationHandlersParams): NavigationHandlers => {
//   const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key !== 'Backspace' && shouldMoveNext()) {
//       onMoveNext();
//     }
//   };

//   const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' && shouldMovePrev()) {
//       onMovePrev();
//     }
//   };

//   return { onKeyUp, onKeyDown };
// };

// const useGroupNavigator = (fields: ReturnType<typeof useField>[]) => {
//   const groupSize = fields.length;
//   const maxIndex = groupSize - 1;

//   const { registerRefs, focusNext, focusPrev } = useFocusGroup({
//     groupSize,
//   });

//   const navigationHandlers = fields.map((field, index) =>
//     createNavigationHandlers({
//       shouldMoveNext: () => field.flags.isCompleted && index < maxIndex,
//       onMoveNext: () => focusNext(index),
//       shouldMovePrev: () => field.flags.isEmpty && index > 0,
//       onMovePrev: () => focusPrev(index),
//     }),
//   );

//   return {
//     registerRefs,
//     navigationHandlers,
//   };
// };

// export default useGroupNavigator;
