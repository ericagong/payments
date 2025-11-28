export default {
  '*.{ts,tsx,js,jsx}': (files) => {
    const fileList = files.join(' ');

    return [
      'echo ✨ Formatting source files with Prettier...',
      // format
      `pnpm format ${fileList}`,
      'echo ✅ Formatting complete!',
      // eslint
      'echo 🧹 Linting and fixing source files with ESLint...',
      `pnpm eslint ${fileList}`,
      'echo ✅ Linting complete!',
    ];
  },

  '*.{scss,css}': (files) => {
    const fileList = files.join(' ');

    return [
      // format
      'echo ✨ Formatting style files with Prettier...',
      `pnpm format ${fileList}`,
      'echo ✅ Formatting complete!',
      // stylelint
      'echo 💅 Linting and fixing style files with Stylelint...',
      `pnpm stylelint ${fileList}`,
      'echo ✅ Stylelint complete!',
    ];
  },

  '*.{md,json,yml,yaml}': (files) => {
    const fileList = files.join(' ');

    return [
      // format
      'echo ✨ Formatting markdown and config files with Prettier...',
      `pnpm format ${fileList}`,
      'echo ✅ Formatting complete!',
    ];
  },
};
