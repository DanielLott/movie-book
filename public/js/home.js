var authKey = '6ea54ebb5a72237bb912260532bd86c7';

// holds results
var resultsContainer;

function runEventQuery(queryTerm) {
    var queryURL = "https://api.themoviedb.org/3/movie/550?api_key=" + authKey;
    var queryURL2 = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + authKey + "&release_date.gte=2019-01-20&release_date.lte=2019-04-01&language=en-US&page=1";
    var queryURL3 = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + authKey + "&language=en-US&page=1&region=US";
    // ajax call for movieDB
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {

        for (i = 0; i < 3; i++) {
            let moviePoster = response.results[i].poster_path
            // console.log in order to examine JSON object response
            console.log(response.results[i].title);
            // console.log(response[i].original_title);
            console.log(response.results[i].overview);
            $(".movie-image" + i).attr("src", "http://image.tmdb.org/t/p/w185/" + moviePoster);
            console.log(moviePoster);
        }
        });
};

runEventQuery();