const Plugin1 = require("./plugins/plugin1")

const CopyWebpackPlugin = require("./plugins/CopyWebpackPlugin")


module.exports = {
    mode: 'production',
    plugins: [
        // new Plugin1(),
        new CopyWebpackPlugin(
            {
                from: 'public',
                to:'aa',
                ignore: ['**/index.html']
            }
        )
    ]
}