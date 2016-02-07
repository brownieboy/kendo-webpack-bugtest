import path from 'path';
import webpack from 'webpack';
// import BowerWebpackPlugin from 'bower-webpack-plugin';
import merge from 'webpack-merge';

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
// const bower_dir = ROOT_PATH + '/bower_components';

var exportModule;


const common = {
    entry: {
        app: path.resolve(ROOT_PATH) + "/src/js/app.js",
    },
    resolve: {
        // modulesDirectories: ['node_modules', 'bower_components']
        alias: {
            kendo: "kendo-ui-core/src"
        }
    },
    module: {
        loaders: [{
            loaders: ["babel-loader"],

            // Skip any files outside of your project's `src` directory
            include: [
                path.resolve(__dirname, "src/js"),
            ],
            // Only run `.js` files through Babel
            test: /\.js?$/
        }]
    },
    plugins: [
        // new BowerWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // })
    ],
    devtool: 'source-map'
};

if (TARGET === 'build') {
    // Sames as build final but without minification/uglification, so big bundle.js
    exportModule = merge(common, {
        output: {
            path: path.resolve(ROOT_PATH, 'build/js/'),
            filename: 'bundle.js'
        }
    })
}

if (TARGET === 'buildFinal') {
    // Includes minification, so slow build times and smaller files.  Use for final build to prod only.
    exportModule = merge(common, {
        output: {
            path: path.resolve(ROOT_PATH, 'build/js/'),
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    })
}

// Note when inline is set to true, we get an error:
//  Module not found: Error: Cannot resolve 'file' or 'directory' ./dist/debug.js
// see http://stackoverflow.com/questions/34549508/webpack-dev-server-error-with-hot-module-replacement
const devServerCommon = {

    entry: ['webpack/hot/dev-server', path.resolve(ROOT_PATH) + "/src/js/app.js"],

    devServer: {
        colors: true,
        noInfo: false,
        historyApiFallback: true,
        // hot: true,
        inline: true,
        progress: true
    },
    output: {
        publicPath: "/",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

const startCommon = merge(common, devServerCommon);

if (TARGET === 'start' || !TARGET) {
    exportModule = merge(startCommon, {
        entry: {
            app: path.resolve(ROOT_PATH) + "/src/js/app.js",
        },

        output: {
            filename: 'src/main.js'
        }
    })
}


// console.log("exportModule = " + JSON.stringify(exportModule));
// console.log("exportModule.plugins = " + JSON.stringify(exportModule.plugins));
// console.log("plugins count = " + exportModule.plugins.length);
// console.log("exportModule.module.loaders = " + JSON.stringify(exportModule.module.loaders));

export default exportModule;

// module.exports = {
//   context: __dirname + '/app',
//   entry: {
//     javascript: "./app.js",
//     html: "./index.html"
//   },
//   output: {
//     filename: 'app.js',
//     path: __dirname + '/dist'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loaders: ['babel-loader']
//       },
//       {
//         test: /\.jsx$/,
//         loaders: ['babel-loader']
//       },
//       {
//         test: /\.html$/,
//         loader: "file?name=[name].[ext]"
//       }
//     ]
//   }
// };


// {
//     test: /\.jsx?$/,
//     loader: 'babel-loader',
//     exclude: /node_modules/,
//     query: {
//         presets: ['es2015']
//     }
// }



// import webpack from 'webpack';
// import yargs from 'yargs';

// const { optimizeMinimize } = yargs.alias('p', 'optimize-minimize').argv;
// const nodeEnv = optimizeMinimize ? 'production' : 'development';

// export default {
//   entry: {
//     'ReactRouterBootstrap': './src/index.js'
//   },
//   output: {
//     path: './lib',
//     filename: optimizeMinimize ? '[name].min.js' : '[name].js',
//     library: 'ReactRouterBootstrap',
//     libraryTarget: 'umd'
//   },
//   module: {
//     loaders: [
//       { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
//     ]
//   },
//   externals: [
//     {
//       'react': {
//         root: 'React',
//         commonjs2: 'react',
//         commonjs: 'react',
//         amd: 'react'
//       }
//     },
//     {
//       'react-router': {
//         root: 'ReactRouter',
//         commonjs2: 'react-router',
//         commonjs: 'react-router',
//         amd: 'react-router'
//       }
//     }
//   ],
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': { 'NODE_ENV': JSON.stringify(nodeEnv) }
//     })
//   ],
//   devtool: optimizeMinimize ? 'source-map' : null
// };
