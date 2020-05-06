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


//Youtube_carousel_api

var Youtube_carousel = (function () {

    function selectChannel(user_name) {
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/channels",
            type: "GET",
            dataType: "json",
            data: {
                part: "contentDetails",
                forUsername: user_name,
                key: $("meta[name=yt-api-k]").attr("value")
            },
            success: function (d) {
                $("#yt_list").html("");
                if (d.pageInfo.totalResults > 0) {
                    console.dir(d.items);
                    for (var _i = 0, _a = d.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var uploads = "PL86SiVwkw_odDEl6Hxnpx8qJyjQBgYuTM";
                        getVideos(uploads);
                    }
                } else {
                    $("input#user_name").addClass("error");
                    $("div#channel_input > .info")
                        .show()
                        .html("This user not exists");
                }
            },
            error: function (x) {
                console.dir(x);
            }
        });
    }

    function getVideos(yt_id, next_page) {
        if (next_page === void 0) {
            next_page = "";
        }
        var limit = 7;
        var more = "";
        var xhr = $.ajax({
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            type: "GET",
            dataType: "json",
            data: {
                part: "snippet",
                playlistId: yt_id,
                maxResults: limit,
                pageToken: next_page,
                key: $("meta[name=yt-api-k]").attr("value")
            },
            success: function (data) {
                console.dir(data);
                for (var i = 0; i < limit; i++) {
                    var title = $("<h3>").append(data.items[i].snippet.title);
                    var thumb = $("<img>").attr("src", data.items[i].snippet.thumbnails.medium.url);
                    var video_id = data.items[i].snippet.resourceId.videoId;
                    var link = $("<a class='video-link' data-toggle='modal' data-target='#exampleModalCenter' href='#'>")
                        .data("videoid", video_id)
                        .append(thumb);
                    var holder = $("<div class='item'>").append(link, title);
                    $("#yt_list").append(holder);
                }
                $("#yt_list").append(more);
                $('#yt_list').slick({
                    dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    speed: 800,
                    slidesToShow: 5,
                    adaptiveHeight: true,
                    responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: true
                            }
                                },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                                },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                                }

                            ]
                });
            }
        });
        console.dir(xhr);
    }
    /* load more*/
    $("#yt_list").on("click", "#load-more", function () {
        $(this)
            .animate({
                "transform": "scaleX(4)",
                "opacity": "0.1"
            }, function () {
                getVideos($(this).data("yt-id"), $(this).data("next-page"));
                $(this).remove();
            });
    });
    /* embeds */
    $("#yt_list").on("click", "a.video-link", function () {
        var video_id = $(this).data("videoid");
        $("#root").attr(
            "src",
            "https://youtube.com/embed/" +
            video_id +
            "?controls=0&showinfo=0&rel=0&autoplay=1"
        );
    });

    $('#exampleModalCenter').on('hide.bs.modal', function (e) {
        var video_id = $(this).data("videoid");
        var leg = $('#root').attr(
            "src",
            "https://youtube.com/embed/" +
            video_id +
            "?controls=0&showinfo=0&rel=0&autoplay=0");
        $('#root').attr("src", leg);
    })

    function init() {
        var default_user_name = "KankakeeCommCollege";
        selectChannel(default_user_name);
        $('.no-fouc').removeClass('no-fouc');
    }

    return {
        init: init
    };

})();

$(document).ready(Youtube_carousel.init);



window.onload = function () {
    $.getJSON("http://www.omdbapi.com/?i=tt0078748&apikey=728657e2", get);
}

var result = document.createElement('div');

function get(movies) {
    var result = "";
    $.each(movies, function (key, value) {
        result += "<strong>" + key + "</strong> : </p>" + value + "</p><hr />";

    });

    $('#movie').html(result);
}


//Get the posters, Titles, years, type

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

    //const alt = document.querySelector('[alt="Poster"]');

    const ul = document.querySelector('ul');

    moviesArray.forEach(movie => {

        // create li
        const li = document.createElement('li')
        li.innerHTML = `<h3><strong></strong>${movie.Title}</br><strong>Production:</strong>${movie.Year}</br><strong>Type:</strong>${movie.Type}</br><strong>Imdbid:</strong>${movie.imdbID}</h3>`;

        // img if Poster
        if (movie.Poster !== 'N/A') {

            // create img
            const img = document.createElement('img');
            img.setAttribute('src', movie.Poster);

            // img to li
            li.insertAdjacentElement('beforeend', img);
        }

        // li to ul
        ul.insertAdjacentElement('beforeend', li);

        // alt to url
        //  alt.insertAdjacentElement('afterend', img);
    })
}
