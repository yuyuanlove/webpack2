const Plugin2 = require("./plugins/plugin2")

module.exports = {
    mode: 'production',
    plugins: [
        // new Plugin1(),
        new Plugin2()
    ]
}