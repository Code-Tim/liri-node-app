require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var fs = require("fs");
const moment = require("moment");

//argv[2] chooses users actions
var firstInput = process.argv[2];
//argv[3] is input parameter
var secondInput = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    secondInput += '+' + process.argv[i];
}

console.log(secondInput)

controller()
function controller() {

    switch (firstInput) {
        case "concert-this":
            concertThis(secondInput)
            break;
        case "movie-this":
            movieThis(secondInput);
            break;
        case "spotify-this-song":
            spotThis(secondInput)
            break;
        case "do-what-it-says":
            doWhatItSays()
            break;

        default:
            youNeedHelp()
            break;
    }
}
function youNeedHelp() {
    console.log("I didn't understand that")
    //ICEBOX: inquirer
}
// JSON.stringify(data, null, 10)

function concertThis(artist = "Celine Dion") {
    // What Each Command Should Do
    // node liri.js concert-this <artist/band name here>

    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
    let url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(url)
    axios.get(url)
        .then(function (response) {
            // handle success
            let stub = {}
            // Name of the venue
            var venue = response.data[i].venue.name;
            // Venue location
            var location = response.data[i].venue.city + ", " + response.data[i].venue.region;
            // Date of the Event (use moment to format this as "MM/DD/YYYY")
            var date = dayjs(response.data[i].datetime).format('{YYYY} MM-DDTHH:mm:ss sss [z] A');

            console.log(response);

        })


    // Important: There is no need to sign up for a Bands in Town api_id key. Use the codingbootcamp as your app_id. For example, the URL used to search for "Celine Dion" would look like the following:

    // https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp

}

// This will show the following information about the song in your terminal/bash window
// node liri.js spotify-this-song '<song name here>'
function spotThis() {
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (!secondInput) {
        secondInput = 'The Sign, Ace of Base';
    }

    spotify
        .search({ type: 'track', query: secondInput })
        .then(function (response) {
            // Artist(s)
            console.log(response.tracks.items[0].album.artists[0].name);
            // The song's name
            console.log(response.tracks.items[0].name);
            // A preview link of the song from Spotify
            console.log(response.tracks.items[0].preview_url);
            // The album that the song is from
            console.log(response.tracks.items[0].album.name);

        })
        .catch(function (err) {
            console.log(err);
        });
}
// node liri.js movie-this '<movie name here>'
function movieThis() {
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (!secondInput) {
        secondInput = 'Mr. Nobody';
    }

    axios
        .get('http://www.omdbapi.com/?t=' + secondInput + '&y=&plot=short&apikey=trilogy')
        .then(
            function (response) {
                //   * Title of the movie.
                console.log("\nTitle: " + response.data.Title);
                //   * Year the movie came out.
                console.log('Date Released: ' + response.data.Released);
                //   * IMDB Rating of the movie.
                console.log('Rating: ' + response.data.imdbRating);
                //   * Rotten Tomatoes Rating of the movie.
                console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
                //   * Country where the movie was produced.
                console.log('Country of Origin: ' + response.data.Country);
                //   * Language of the movie.
                console.log('Language: ' + response.data.Language);
                //   * Plot of the movie.
                console.log('Main Plot: ' + response.data.Plot);
                //   * Actors in the movie.
                console.log('Actors: ' + response.data.Actors);


            }
        )

        // .search({

        // })
        .catch(function (err) {
            console.log(err);
        });
}
// This will output the following information to your terminal/bash window:


// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

// It's on Netflix!

// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.

// node liri.js do-what-it-says
function doWhatItSays() {
    //prevent inifinite feedback loop in case it says "do-what-it-says"
    fs.readFile("./random.txt", "utf-8", (err, data) => {
        console.log(data)
        //split the data into first and second inputs and call the controller again
    })
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

    // Edit the text in random.txt to test out the feature for movie-this and concert-this.
}