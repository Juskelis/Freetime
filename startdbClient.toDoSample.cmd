mongo --port 3000 -u dbAdmin -p test --authenticationDatabase admin

db.createUser(
  {
    user: "dbAdmin",
    pwd: "test",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)