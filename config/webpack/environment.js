const { environment } = require('@rails/webpacker')

const path = require('path');

const customConfig = {
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
            '@pages': path.resolve(__dirname, '..', '..', 'app/javascript/src/pages'),
            '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/src/utils'),
            '@context': path.resolve(__dirname, '..', '..', 'app/javascript/src/context'),
            '@components': path.resolve(__dirname, '..', '..', 'app/javascript/src/components'),
            '@stylesheets': path.resolve(__dirname, '..', '..', 'app/javascript/stylesheets'),
            '@images': path.resolve(__dirname, '..', '..', 'app/assets/images')
        },
    },
};

environment.config.merge(customConfig);

environment.splitChunks()

module.exports = environment
