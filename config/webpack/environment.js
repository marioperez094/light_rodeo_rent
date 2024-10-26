const { environment } = require('@rails/webpacker')

const path = require('path');

const customConfig = {
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
            '@adminPages': path.resolve(__dirname, '..', '..', 'app/javascript/src/admin/pages'),
            '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/src/utils'),
            '@context': path.resolve(__dirname, '..', '..', 'app/javascript/src/context'),
            '@adminComponents': path.resolve(__dirname, '..', '..', 'app/javascript/src/admin/components'),
            '@stylesheets': path.resolve(__dirname, '..', '..', 'app/javascript/stylesheets'),
            '@images': path.resolve(__dirname, '..', '..', 'app/assets/images')
        },
    },
};

environment.config.merge(customConfig);

environment.splitChunks()

module.exports = environment
