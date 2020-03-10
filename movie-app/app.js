const moviedb = require('moviedb')
const inquirer = require('inquirer')

async function search(title){
    loadHome()

    const searchingMovieTitle = await moviedb.search(title)
    if(searchingMovieTitle.Response == 'False'){
        console.log(searchingMovieTitle.Error)
    }
    else{
        const movieSelection = await moviePrompt(searchingMovieTitle)
        //console.log(searchingMovieTitle)
        const id = movieSelection.movieID

        const fetchMovie = await moviedb.getByID(id)
        print(fetchMovie)
    }
}

function loadHome(){
    const homeScreen = 
    '\n\n' +
    '************************************************************\n' + 
    '*             M O V I E - A P P L I C A T I O N            *\n' +
    '************************************************************\n';
    console.log(homeScreen)
}

async function moviePrompt(movies){
    const displayMovie = movies.Search.map(movie => {
        return {name: `${movie.Title}(${movie.Year})`, value: `${movie.imdbID}`}
    })

    return inquirer.prompt([{
        type: 'list',
        message: 'Select a movie for more information:',
        name: 'movieID',
        choices: displayMovie,
        pageSize: 10
}])

}

function print(movie){
    let info = `\n\n` +
        `\t\t\tReleased: ${movie.Released}\n` +
        `\t\t\tRuntime: ${movie.Runtime}\n` + 
        `\t\t\tRated: ${movie.Rated}\n` +
        `\t\t\tGenre: ${movie.Genre}\n` +
        `\t\t\tDirector: ${movie.Director}\n` +
        `\t\t\tWriter(s): ${movie.Writer}\n` +
        `\t\t\tActor(s): ${movie.Actors}\n` +
        `\t\t\tAwards: ${movie.Awards}\n` +
        `\t\t\tIMDB Rating: ${movie.imdbRating}/10\n`
    if(movie.Type == 'series')
        info += `\t\t\tType: ${movie.Type}\n` + `\t\t\tTotal Seasons: ${movie.totalSeasons}`
    else
        info += `\t\t\tType: ${movie.Type}\n`

    info += '\n\n'

    console.log(info)
}

module.exports = {
    search
}