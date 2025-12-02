const onlyNumeric = (value: string) => value.replace(/\D/g, '');

const clamp = (index: number, length: number) => Math.max(0, Math.min(index, length - 1));

const toArray = <T>(value?: T | T[]): T[] => (value ? (Array.isArray(value) ? value : [value]) : []);

export { onlyNumeric, clamp, toArray };
