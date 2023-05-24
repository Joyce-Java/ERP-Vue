const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.module
            .rule('vue')
            .test(/\.vue$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .rule('css')
            .test(/\.css$/)
            .use('style-loader')
            .loader('style-loader')
            .end()
            .use('css-loader')
            .loader('css-loader')
            .end()
    }, devServer: {
            host: '0.0.0.0',
            // https:true,
            port: 6103,
            client: {
                webSocketURL: 'ws://0.0.0.0:8091/ws',
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        },

        transpileDependencies: true

})

