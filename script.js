var success = new XMLHttpRequest();
fetch('http://www.omdbapi.com/?s=alien&apikey=728657e2')
    .then((success) => success.json())
    .then((movies) => {
        console.log(movies)

        success.onload = function () {
            var success = request.success;
            var movies = JSON.parse(response);

            for (item in movies) {

                //Display all the product names
                var title = movies[0].Title;
                var film = document.createElement('li');
                products.innerHTML = title;
                document.body.appendChild(film);


                // Display all the product images
                var imageUrl = movies[0].Poster;
                var images = document.createElement('img');
                images.setAttribute('src', imageUrl);
                document.body.appendChild(images);

            }
        }
    })

    .catch((err) => {
        console.log(err)
    });
