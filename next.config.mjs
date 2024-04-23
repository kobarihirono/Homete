/** @type {import('next').NextConfig} */
// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  sassOptions: {
    prependData: `@import "${path.resolve(__dirname, 'src/styles/foundation/_variables.scss')}";` +
                 `@import "${path.resolve(__dirname, 'src/styles/foundation/_mixin.scss')}";`,
  },
};

export default nextConfig;
