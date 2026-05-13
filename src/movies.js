// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return [...new Set(moviesArray.map((movie) => movie.director))]
    //le ...new Set permet de ne pas dupliquer les valeurs
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const result =  moviesArray.filter((movie) => {
       return movie.genre.includes("Drama") && movie.director.includes("Steven Spielberg") ? movie : 0
    })
    return result.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (!moviesArray.length) {
        return 0
    }
    const totalScore = moviesArray.reduce((acc, movie) => {return acc + (movie.score || 0)}, 0)
    //ci-dessus, j'ai utilisé (movie.score || 0) comme un coalesce
    return(parseFloat((totalScore / moviesArray.length).toFixed(2)))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaTotalMovies = moviesArray.filter((movie) => {return movie.genre.includes("Drama")})
    if (!dramaTotalMovies.length) {
        return 0
    }
    const dramaScore = dramaTotalMovies.reduce((acc, movie) => {return acc + (movie.score || 0)}, 0)
    return(parseFloat((dramaScore / dramaTotalMovies.length).toFixed(2)))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    return [...moviesArray].sort((a, b) => {return (a.year - b.year) === 0 ? a.title.localeCompare(b.title) : a.year - b.year})
//[...moviesArray] est utilisé pour copier l'array avant de l'utiliser
//localeCompare permet de trier par ordre alphabétique
//concrètement je fais un tri sur l'année, et si le tri résulte en 0 (càd la même année), alors je fais un tri sur le titre, sinon sur l'année
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return [...moviesArray]
        .sort((a, b) => {return a.title.localeCompare(b.title)})
        .map((movie) => movie.title)
        .slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const durationSplit = [...moviesArray].map((movie) => {
        const split = movie.duration.split("h")
        const hours = parseInt(split[0])
        const minute = parseInt(split[1] || 0)
        const durationCalc = (hours *60)+minute
        return {...movie, duration: durationCalc}
    })
    return durationSplit
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if(!moviesArray.length) {
        return null
    }
    const moviesByYear = Object.groupBy(moviesArray, (movie) => movie.year)
    const moviesEntries = Object.entries(moviesByYear)
        .map(([year, films]) => {return { year, score: scoresAverage(films)}})
        .sort((a, b) => a.year - b.year)
    //([movie, films]) => scoresAverage(films) ici, on fait de la destructuration, on dit juste prend le premier element de l'array, appelle le movie, le deuxième appelle le films
    const bestScore = Math.max(...moviesEntries.map(scoreObj => scoreObj.score))
    const bestYear = moviesEntries.find(({score}) => score === bestScore)
    return `The best year was ${bestYear.year} with an average score of ${bestYear.score}`

}


//Self guided : Asked AI to create 2 new exercises

//Iteration 9: Return the name of the director that made most movies. If there's a tie, return the first in alphabetical order, return null if the array is empty

function mostProductiveDirector (moviesArray) {
    if (!moviesArray.length) {
        return null
    }
    const moviesByDirector = Object.entries(Object.groupBy(moviesArray, (movie) => movie.director))
    const moviesCount = moviesByDirector.map(([director, movies]) => {return {director, movies: movies.length}})
    moviesCount.sort((a, b) => {return (b.movies - a.movies) === 0 ? a.director.localeCompare(b.director) : (b.movies - a.movies)})
    return `The director that directed the most movies is ${moviesCount[0].director} with ${moviesCount[0].movies} movies.`
}

//Iteration 10: return an object where each key is the genre, and the value is the longest movie of this genre (in minutes). If two movies hav the same length, take the first from the array.

/*
function longestMovieByGenre (moviesArray) {
        if (!moviesArray.length) {
        return null
    }
    const moviesAllGenre = moviesArray.flatMap((movie) => movie.genre.map((genre) => {return { ...movie, currentGenre: genre }}))
    const moviesAllGenreGrouped = Object.entries(Object.groupBy(moviesAllGenre, (movie) => movie.currentGenre))
    //moviesAllGenreGrouped.map((movie) => {})
    return moviesAllGenreGrouped
}
*/