const shouldNotTrigger = () => false;

const identity = (value: string) => value;

const noErrorMessage = () => '';

const doNothing = () => {};

const onlyNumeric = (value: string) => value.replace(/\D/g, '');

const required = (value: string) => value.length !== 0;

// [0, length-1] 범위 내의 인덱스 반환
const getSafeIndex = (index: number, length: number) => Math.max(0, Math.min(index, length - 1));

export { shouldNotTrigger, identity, noErrorMessage, doNothing, onlyNumeric, required, getSafeIndex };
