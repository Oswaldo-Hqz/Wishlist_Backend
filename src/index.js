require('dotenv').config();
const app = require('./app');
require('./database');


async function main() {
    // app.listen(4000, () => console.log('Server en puerto 4000'));
    await app.listen(app.get('port'));
    console.log('Run on port: ', app.get('port'));    
}

main();

