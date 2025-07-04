export default () => ({
  port: process.env.PORT ?? 3000,
  database: {
    database_name: process.env.DATABASE_NAME,
    database_password: process.env.DATABASE_PASSWORD,
  }
})  