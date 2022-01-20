const sql = require("mssql");

var sqlConfig = {
    server: "juniorj-sql.database.windows.net",
    port: 1433,
    database: "personas",
    user: "junior-admin",
    password: "Trollface120",
    options: {
        encrypt: true
    }

}

async function getPersonas () {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query`SELECT * FROM [dbo].Person`
        console.dir(result.recordset[0].FirstName)
    } catch (err) {
        console.log("Error: ", err)
    }
}

getPersonas();