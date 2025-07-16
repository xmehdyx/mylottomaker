// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // اگر از alias برای مسیرها استفاده می‌کنید:
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        // پکیج‌هایی که می‌خواهید به‌جای bundle شدن در build، external بمانند:
        'clsx',
        // مثلا اگر بعدا ارور برای 'lodash' یا 'dayjs' یا …
        // 'lodash',
        // 'dayjs',
      ],
    },
  },
});
