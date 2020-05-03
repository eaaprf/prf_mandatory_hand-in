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


window.onload=function()
    {
	  $.getJSON("http://www.omdbapi.com/?i=tt0094631&apikey=728657e2",get);
}
        
var result = document.createElement('div');
   function get(movies){      
	   var result="";
       $.each(movies,function(key,value){
          result+="<strong>"+ key + "</strong> : </p>" + value +"</p><hr />"; 
          		 
       }); 
	   
	   $('#movie').html(result);
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

const createMovies = (moviesArray) => {
  console.log(moviesArray);
  
const ul = document.querySelector('ul');

    moviesArray.forEach(movie => {
      
    // create li
const li = document.createElement('li')
    li.innerHTML = `<h3>${movie.Title} - ${movie.Year}</h3>`;

    // img if Poster
if(movie.Poster !== 'N/A') {
  
    // create img
  const img = document.createElement('img');
      img.setAttribute('src', movie.Poster);      
      
    // img to li
      li.insertAdjacentElement('beforeend', img);
    }

    // li to ul
    ul.insertAdjacentElement('beforeend', li);
  })
}
