export default {
  esm: { type: 'babel' },
  cjs: { type: 'babel' },
  umd: {
    globals: {
      react: 'React',
    },
  },
  runtimeHelpers: true,
};
