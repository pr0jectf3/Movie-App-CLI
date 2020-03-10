const config = require('./config');

const superagent = require('superagent');

exports.getByID = (id) => {
    //get movie by id
    return superagent.get(`${config.url}i=${id}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.search = (title) => {
    //search for a movie
    return superagent.get(`${config.url}s=${title}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}
