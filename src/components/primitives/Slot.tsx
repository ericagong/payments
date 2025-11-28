import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import type { ReactElement } from 'react';

type SlotProps = {
  children: ReactElement;
} & Record<string, any>;

function enforceSingleChild(child: any) {
  if (Children.count(child) !== 1 || !isValidElement(child)) {
    throw new Error('<Slot> 컴포넌트는 반드시 하나의 ReactElement만을 자식으로 가져야 합니다.');
  }

  return child as ReactElement;
}

function composeRefs(...refs: any[]) {
  return (node: any) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(node);
      // eslint-disable-next-line eqeqeq
      else if (ref != null) ref.current = node;
    });
  };
}

function isEventHandler(name: string) {
  return name.startsWith('on') && name[2] === name[2]?.toUpperCase();
}

function composeEventHandlers(childHandler: (...args: any[]) => void, slotHandler: (...args: any[]) => void) {
  return (...args: any[]) => {
    childHandler?.(...args);
    slotHandler?.(...args);
  };
}

function mergeProps(slotProps: any, childProps: any) {
  // 기본 규칙 : slotProps 우선
  const mergedProps = { ...childProps, ...slotProps };

  // className: slotProps, childProps 모두 유지하되, falsy 값 제거
  if (childProps.className || slotProps.className) {
    mergedProps.className = [childProps.className, slotProps.className].filter(Boolean).join(' ').trim();
  }

  for (const propName in slotProps) {
    // event handler: slotProps, childProps 모두 실행
    if (isEventHandler(propName) && childProps[propName]) {
      mergedProps[propName] = composeEventHandlers(childProps[propName], slotProps[propName]);
    }
  }

  return mergedProps;
}

const Slot = forwardRef<any, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  const child = enforceSingleChild(children);

  const mergedProps = mergeProps(slotProps, child.props);

  mergedProps.ref = composeRefs(forwardedRef, (child as any).ref);

  return cloneElement(child, mergedProps);
});

Slot.displayName = 'Slot';

export default Slot;
