
const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin1')

module.exports = {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            from: 'public',
            // to:'public',
            ignore:['**/index.html']
        }),
    ]
}