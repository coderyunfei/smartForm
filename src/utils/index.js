const files = require.context(".", false, /.js$/);

const obj = {};

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  Object.assign(obj, { ...files(key).default });
});

export default {
  ...obj,
};
