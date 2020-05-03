//var success = new XMLHttpRequest();
//fetch('http://www.omdbapi.com/?s=alien&apikey=728657e2')
//    .then((success) => success.json())
//    .then((movies) => {
//        console.log(movies)
//
//        success.onload = function () {
//            var success = request.success;
//            var movies = JSON.parse(response);
//
//
//            for (item in movies) {
//
//                //Display all the product names
//                var title = movies[0].Title;
//                var film = document.createElement('li');
//                products.innerHTML = title;
//                document.body.appendChild(film);
//
//
//                // Display all the product images
//                var imageUrl = movies[0].Poster;
//                var images = document.createElement('img');
//                images.setAttribute('src', imageUrl);
//                document.body.appendChild(images);
//
//            }
//        }
//    })
//
//    .catch((err) => {
//        console.log(err)
//    });



// target the input & form
const div = document.querySelector('div');

const createMovies = (moviesArray) => {
  console.log(moviesArray);
  const ul = document.querySelector('ul');

  // clear ul everytime
  ul.innerText = ''

  moviesArray.forEach(movie => {
    // create li
    const li = document.createElement('li')
    li.innerHTML = `<h3>${movie.Title} - ${movie.Year}</h3>`;

    // create img only if movie has Poster
    if(movie.Poster !== 'N/A') {
      const img = document.createElement('img');
      img.setAttribute('src', movie.Poster);      
      
      // insert img into li
      li.insertAdjacentElement('beforeend', img);
    }


    // insert li to ul
    ul.insertAdjacentElement('beforeend', li);
  })
}

const callApi = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(movies => {
      createMovies(movies.Search);
    })
}


  const url = `https://www.omdbapi.com/?s=alien&apikey=728657e2`

  // call the api
  callApi(url);


form.addEventListener('submit', onSubmit);
