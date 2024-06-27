import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bootstrapScripts = [];
const bootstrapCSS = [];
const staticPathRoot = './client/build/assets';

const ReadDirectoryContentToArray = (folderPath, array, extension) => {
  fs.readdir(path.join(__dirname, folderPath), (err, files) => {
    if (err) {
      return console.log(`Unable to scan this folder: ${folderPath}`);
    }
    files.forEach((fileName) => {
      if (fileName.startsWith('index') && fileName.endsWith(extension)) {
        array.push(`assets/${fileName}`);
      }
    });
  });
};
ReadDirectoryContentToArray(`${staticPathRoot}`, bootstrapScripts, '.js');
ReadDirectoryContentToArray(`${staticPathRoot}`, bootstrapCSS, '.css');

export { bootstrapScripts, bootstrapCSS };