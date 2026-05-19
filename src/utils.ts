const onlyNumeric = (value: string) => value.replace(/\D/g, '');

// [0, length-1] 범위 내의 인덱스 반환
const getSafeIndex = (index: number, length: number) => Math.max(0, Math.min(index, length - 1));

export { onlyNumeric, getSafeIndex };
