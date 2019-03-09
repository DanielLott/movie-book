const authKey = '6ea54ebb5a72237bb912260532bd86c7';
const popMovies = [];


// holds results
let resultsContainer = $(".resultsContainer");
const queryURL = "https://api.themoviedb.org/3/movie/550?api_key=" + authKey;
const queryURL2 = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + authKey + "&release_date.gte=2019-01-20&release_date.lte=2019-04-01&language=en-US&page=4";
const queryURL3 = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + authKey + "&language=en-US&page=1&region=US";
const queryURL4 = "https://api.themoviedb.org/3/discover/movie?api_key=" + authKey + "&sort_by=popularity.desc";

let userInfo;
function getUserInfoPromise(){
return $.get("/api/user_data").then( (res) => {
    console.log(res);
    userInfo = res;
});

}


    function loadMyMovies(){
        
        $.get("/api/getMovies?FanaticId="+2)//userInfo.id)
        .then( (result) => {
            console.log(result);
            result.forEach(movie => {
                let card = buildCard(movie);
                addCardToPage(card);
            })
        });
    }

    function loadRecentMovies() {
        // ajax call for movieDB
        $.ajax({
            url: queryURL4,
            method: "GET"
        }).then(function (response) {
            let randArray = [];
            randArray.push(Math.floor(Math.random() * 20));

            while (randArray.length < 20) {
                let newRandom = Math.floor(Math.random() * 20);

                if (randArray.includes(newRandom)) {
                    // console.log(randArray);
                } else {
                    randArray.push(newRandom);
                }
            }

            randArray.forEach(function (value, index) {
                let fullMovieJSON = response.results[value];
                const basicMovieJSON = {};

                basicMovieJSON.title = fullMovieJSON.title;
                basicMovieJSON.posterURL = "http://image.tmdb.org/t/p/w185/" + fullMovieJSON.poster_path;
                basicMovieJSON.description = fullMovieJSON.overview;
                popMovies.push(basicMovieJSON);

                let card = buildCard(basicMovieJSON);
                let addBtn = $("<button/>", {
                    class: "movie-button",
                    // onmouseup: addMovie,
                    text: "Add"
                });
                card.append(addBtn);
                addCardToPage(card);

                addBtn.on("click", () => {
                    addToMyMovies(basicMovieJSON);
                });
                
            });
        });
    }

    function addCardToPage(card){
        resultsContainer.append(card);
    }

    function buildCard(movie){
        let card = $("<div/>", {
            class: "movie-card"
        }),
            cardImg = $("<img/>", {
                class: "movie-image",
                src: movie.posterURL
            });
    
            card.append(cardImg);
            return card;
    }

    function addToMyMovies(movie) {
        console.log("Adding movie:", movie);
        if(!userInfo){
           console.error("User Info has not been set - show an error");
           return;
        }
        $.post("/api/addMovie", {
            title: movie.title,
            overview: movie.description.slice(0,100),
            posterURL: movie.posterURL,
            FanaticId: userInfo.id
        }).then(function (data) {
            console.log("Completed add movie", data);
        }).catch(() => {

        });
    }
