module.exports = {
  database: "cssm_api",
  username: "postgres",
  password: "anakin953k",
  params: {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    define: {
      underscored: false
    }
  },
  email: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '5688b8da61fa86',
      pass: 'ee4227ef0592c8'
    }
  },
  jwt: {
    secret: 't0p-S3cr3t',
    session: {session: false}
  }
};