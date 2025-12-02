const onlyNumeric = (value: string) => value.replace(/\D/g, '');

const clamp = (index: number, length: number) => Math.max(0, Math.min(index, length - 1));

export { onlyNumeric, clamp };
