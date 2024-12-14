/* eslint-disable @typescript-eslint/no-require-imports */
//idk chatgpt

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
