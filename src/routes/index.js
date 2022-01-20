const {Router} = require('express');
const router = Router();
const sql = require("mssql");

var sqlConnString = process.env.CUSTOMCONNSTR_customscript1;

async function getPersonas () {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConnString)
        const result = await sql.query`SELECT * FROM [dbo].Person`
        router.get('/', (req, res) => res.json({message: "Hello " + result.recordset[0].MiddleInitial + " " + result.recordset[0].FirstName}));
    } catch (err) {
        console.log("Error: ", err)
    }
}

getPersonas();

module.exports = router;