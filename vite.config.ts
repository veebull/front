import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dotenv from 'dotenv';

export default () => {
  dotenv.config({ path: `./.env` });
  const mode = process.env.VITE_MODE;

  return defineConfig({
    plugins: [react()],
    base: `${mode === 'dev' ? '/' : '/front/'}`,
    server: {
      host: true,
      port: 3000,
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src/'),
      },
    },
  });
};
