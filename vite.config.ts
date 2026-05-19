/// <reference types="vitest/config" />
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-expect-error – missing type in Vite
        api: 'modern-compiler',
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
          // Storybook 10 + Vitest 4 browser mode 호환 우회.
          // addon-vitest가 삽입하는 _isRunningFromThisFile 가드는 globalThis.__vitest_worker__.filepath와
          // import.meta.url을 비교하는데, browser mode에선 url이 http://로 들어와 절대 매칭되지 않는다.
          // 결과적으로 stories의 _test() 호출이 실행되지 않아 "No test suite found"가 난다.
          // stories를 다른 곳에서 import하지 않는 한 가드는 안전하게 상수 true로 대체 가능하다.
          {
            name: 'storybook-test-guard-override',
            enforce: 'post' as const,
            transform(code: string, id: string) {
              if (!id.includes('.stories.')) return;
              if (!code.includes('_isRunningFromThisFile')) return;
              return code.replace(/const (_isRunningFromThisFile\w*) = [^;]+;/, 'const $1 = true;');
            },
          },
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          environment: 'jsdom',
        },
      },
    ],
  },
});
