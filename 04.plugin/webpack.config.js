const Plugin1 = require("./plugins/plugin1")

module.exports = {
    mode: 'production',
    plugins: [
        new Plugin1()
    ]
}