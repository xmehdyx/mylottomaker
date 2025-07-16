// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        // لیست پکیج‌هایی که باید به صورت external باقی بمانند:
        'clsx',
        // اگر بستهٔ دیگری ارور می‌دهد، آن را اینجا اضافه کنید:
        // 'some-other-package',
      ],
    },
  },
});
