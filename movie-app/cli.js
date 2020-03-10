const app = require('./app')
const yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'searches a movie by title',
        handler: (argv) => {
            let query = '';
            for(let i = 1; i < argv._.length; i++){
                query += argv._[i] + ' '
            }
            app.search(query)
        }
    })
    .help('help')
    .argv