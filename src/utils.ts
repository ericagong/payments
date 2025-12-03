const onlyNumeric = (value: string) => value.replace(/\D/g, '');

const required = (value: string) => value.length !== 0;

const clamp = (index: number, length: number) => Math.max(0, Math.min(index, length - 1));

export { onlyNumeric, required, clamp };
