/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: '/',
    port: 5174
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@components/': `${path.resolve(__dirname, 'src/components')}/`,
      '@Board/': `${path.resolve(__dirname, 'src/components/Board')}/`,
      '@ColorManager/': `${path.resolve(__dirname, 'src/components/ColorManager')}/`,
      '@EncodeBoard/': `${path.resolve(__dirname, 'src/components/EncodeBoard')}/`,
      '@General/': `${path.resolve(__dirname, 'src/components/General')}/`,
      '@MainPage/': `${path.resolve(__dirname, 'src/components/MainPage')}/`,
      '@Menu/': `${path.resolve(__dirname, 'src/components/Menu')}/`,
      '@ModalManager/': `${path.resolve(__dirname, 'src/components/ModalManager')}/`,
      '@Toast/': `${path.resolve(__dirname, 'src/components/Toast')}/`,
      '@Stores/': `${path.resolve(__dirname, 'src/Stores')}/`,
      '@Utils/': `${path.resolve(__dirname, 'src/Utils')}/`,
    }
  },
  plugins: [vue()],
});
