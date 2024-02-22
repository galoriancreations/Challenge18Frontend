module.exports = {
    apps: [
      {
        name: 'Challenge18Frontend',
        exec_mode: 'cluster',
        instances: 'max',
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start',
      },
    ],
  };