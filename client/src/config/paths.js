import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // Source files
  src: path.resolve(__dirname, '../render'),
  server: path.resolve(__dirname, '../../server'),

  // Production build files
  build: path.resolve(__dirname, '../build'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
}
