const path = require('path')

module.exports = {
    mode: 'production',
    module: {
        rules:[
            // {
            //     test: /\.js$/,
            //     loader: 'babelLoader',
            //     options: {
            //         presets:[
            //             '@babel/preset-env'
            //         ]
            //     }
            // },
            {
                test: /\.js$/,
                use:[
                    'loader1',
                    'loader2',
                    {
                        loader: 'loader3',
                        options: {
                            name: 'lxy'
                        }
                    }
                ]
                // loader: 'loader1'
                // loader: path.resolve(__dirname, 'loaders' , 'loader1') //没有resolveLoader时
            }
        ]
    },
    //配置loader的解析规则
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    }
}