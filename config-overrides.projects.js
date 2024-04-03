const scope = process.env.BUILD_SCOPE;

const deepExEntries = [
  {
    isReplaceMain: true,
    entry: 'src/components/shield-option-trade/entry/entry.tsx',
    template: 'public/deepex/option-app.html',
    outPath: '/index.html',
  },
];

const entries = deepExEntries;

module.exports = { entries };
