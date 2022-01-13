const app = require('./app');


async function main(){
    await app.listen(80);
    console.log('Server is running');
}

main();