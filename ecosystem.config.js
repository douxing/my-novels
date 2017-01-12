module.exports = {
  apps: [{
    name: 'my-novels-0',
    script: 'application.js',
    watch: true,
    ignore_watch: [
      'client', 'docs',
      'public', '.gitignore',
      'node_modules', '.git'
    ],
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      PGCONNSTR: process.env.PGCONNSTR || 'postgres://localhost/my-novels-development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000,
      PGCONNSTR: process.env.PGCONNSTR || 'postgres://localhost/my-novels-production'
    }
  }]
};
