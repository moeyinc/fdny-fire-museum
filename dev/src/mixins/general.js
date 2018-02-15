export default {
  methods: {
    // generate a filepath for webpack
    getImageAssetFilePath (filename) {
      return require('@/assets/imgs/' + filename)
    },
    // generate a filepath for webpack
    getImageStaticFilePath (filename) {
      return '/static/imgs/' + filename
    },
    setBGImage (uri) {
      return {
        'background-image': 'url("' + uri + '")',
        'background-repeat': 'no-repeat',
        'background-position': 'center center',
        'background-size': 'contain'
      }
    }
  }
}
