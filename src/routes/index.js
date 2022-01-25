const {Router} = require('express');
const sql = require("mssql");
const router = Router();

// Use a custom connection string from Azure App Service -> App Settings -> CUSTOMCONNSTR_<ConnectionStringName>
const sqlConnString = process.env.CUSTOMCONNSTR_customscript1;

// Create SQL connection pool: Pooling=true;Max Pool Size=20;Min Pool Size=0;Connection Lifetime=30000
const pool1 = new sql.ConnectionPool(sqlConnString);
const pool1Connect = pool1.connect();

async function getPersonas () {
    
    try {
        await pool1Connect; // ensures that the pool has been created

        const request = pool1.request(); // or: new sql.Request(pool1)
        const result = await request.query('SELECT * FROM [dbo].Person');
        router.get('/', (req, res) => res.json({message: "Hello " + result.recordset[0].MiddleInitial + " " + result.recordset[0].FirstName}));
        
    } catch (err) {
        console.log("Error: ", err)
    }
    
    pool1.close();
}

getPersonas();

module.exports = router;