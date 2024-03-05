module.exports = {
  apps: [
    {
      name: 'Challenge18Frontend',
      exec_mode: 'cluster',
      instances: '1',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
    },
  ],
};
