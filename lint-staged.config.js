export default {
  '*.{ts,tsx,js,jsx}': (files) => {
    const fileList = files.join(' ');
    return [`pnpm format ${fileList}`, `pnpm eslint ${fileList}`];
  },
  '*.{scss,css}': (files) => {
    const fileList = files.join(' ');
    return [`pnpm format ${fileList}`, `pnpm stylelint ${fileList}`];
  },
  '*.{md,json,yml,yaml}': (files) => {
    const fileList = files.join(' ');
    return [`pnpm format ${fileList}`];
  },
};
