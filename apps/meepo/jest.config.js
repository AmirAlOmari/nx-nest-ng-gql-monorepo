module.exports = {
  name: 'meepo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/meepo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
