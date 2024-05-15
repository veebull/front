import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dotenv from 'dotenv';
import { nodePolyfills } from 'vite-plugin-node-polyfills'


export default () => {
  dotenv.config({ path: `./.env` });
  const MODE = process.env.VITE_MODE;
  const PORT = Number(process.env.PORT || 0);

  return defineConfig({
    plugins: [react(), nodePolyfills({include: ['buffer']})],
    base: `${MODE === 'dev' ? '/' : '/front/'}`,
    server: {
      host: true,
      port: PORT || 3000,
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src/'),
      },
    },
  });
};
