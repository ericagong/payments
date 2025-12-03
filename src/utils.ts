const onlyNumeric = (value: string) => value.replace(/\D/g, '');

const required = (value: string) => value.length !== 0;

const maxLength = (length: number) => (value: string) => value.slice(0, length);

const clamp = (index: number, length: number) => Math.max(0, Math.min(index, length - 1));

export { onlyNumeric, required, maxLength, clamp };
