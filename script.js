var success = new XMLHttpRequest();
fetch('http://www.omdbapi.com/?s=alien&apikey=728657e2')
    .then((success) => success.json())
    .then((movies) => {
        console.log(createMovies)
    });
success.onload = function () {
        var success = request.success;
        var createMovies = JSON.parse(response);


        var createMovies = (moviesArray) => {
            console.log(moviesArray);
            var ul = document.querySelector('ul');

            // clear ul everytime
            ul.innerText = ''

            moviesArray.forEach(movie => {
                // create li
                var li = document.createElement('li')
                li.innerHTML = `<h3>${movie.Title} - ${movie.Year}</h3>`;

                // create img only if movie has Poster
                if (movie.Poster !== 'N/A') {
                    var img = document.createElement('img');
                    img.setAttribute('src', movie.Poster);

                    // insert img into li
                    li.insertAdjacentElement('beforeend', img);
                }


                // insert li to ul
                ul.insertAdjacentElement('beforeend', li);
            })
        }

    }

    .catch((err) => {
        console.log(err)
    });
