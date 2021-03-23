const Plugin2 = require("./plugins/plugin2")

const CopyWebpackPlugin = require("./plugins/CopyWebpackPlugin")


module.exports = {
    mode: 'production',
    plugins: [
        // new Plugin1(),
<<<<<<< HEAD
        new CopyWebpackPlugin(
            {
                from: 'public',
                to:'aa',
                ignore: ['**/index.html']
            }
        )
=======
        new Plugin2()
>>>>>>> a98f53a7300c3591c012d7644ad9f31c5db06649
    ]
}