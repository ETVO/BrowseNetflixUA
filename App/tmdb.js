const api_search_url = "https://api.themoviedb.org/3/search/";
const api_movie_url = "https://api.themoviedb.org/3/";
const api_key = '19f84e11932abbc79e6d83f82d6d1045';
const api_img_url = 'https://image.tmdb.org/t/p/w500/';
const youtube_url = 'https://www.youtube.com/embed/';
const youtube_url_params = '?autoplay=1&amp;modestbranding=1&amp;showinfo=0';


function tmdbImage(name, type, getVideo) {

    var query = getTMDbSlug(name);
    if(type!="movie" && type!="person"){
        type="tv"
    }
    url = api_search_url + type;
    specific_url = api_movie_url+type;
    
    
    $.ajax({
        url: url,
        data: {
            api_key: api_key,

            query: query
        },
        success: function (data) {
          

            if (data.results.length > 0) {
                //console.log("TMDb data: ", url);

                if(type == 'movie')
                    var index = data.results.findIndex(result => result.original_title.toLowerCase() === name.toLowerCase());
                else
                    var index = data.results.findIndex(result => result.name.toLowerCase() === name.toLowerCase());

                if (index == -1) index = 0;
                data = data.results[index];

                var image_path = (type == 'person') ? data.profile_path : data.poster_path; 

                var img = api_img_url + image_path;
                //console.log('TMDb image: ', img);
                if (image_path) {
                    document.getElementById(query).setAttribute("src", img);
                }
                else {
                    document.getElementById(query).style.display = 'none';
                }
                var tmbd_id = data.id;

                $('#' + query + '-image-modal-btn').click(function () {
                    $('#' + query + '-image-popup').attr('src', img);
                });

                $('#' + query + '-image-modal').on('shown.bs.modal', function (e) {
                    $('#' + query + '-image-popup').attr('src', img);
                });

                
                    $.ajax({
                        url: specific_url + tmbd_id + "?api_key=" + api_key + "&append_to_response=videos",

                        success: function (data) {
                            //console.log("TMDb specific data: ",  specific_url + tmbd_id + "?api_key=" + api_key + "&append_to_response=videos");

                            if (data.videos.results.length > 0) {
                                //console.log("TMDb YouTube URL:  " + youtube_url + data.videos.results[0].key);
                                var video_src= youtube_url + data.videos.results[0].key;
                                var video_type = data.videos.results[0].type;
                            }

                        },
                        error: function (err) {
                            console.clear()
                        }
                    });
                


            }
            else {
                //console.log("TMDb no data for ", query);
                document.getElementById(query).style.display = 'none';
            }




        },
        error: function (err) {
            console.clear()
        }
  
    });
    
  
}

function getTMDbSlug(name) {
    return name.trim().normalize("NFKD").replaceAll(/[^\-\w\s]/gi, '').trim().replaceAll(' ', '-').toLowerCase();
}



function tmdbBackdrop(name, getVideo) {

    var query = getTMDbSlug(name);
    
    url = api_search_url + type;
    specific_url = api_movie_url + type + '/';

    $.ajax({
        url: url,
        data: {
            api_key: api_key,

            query: query
        },
        success: function (data) {
            //console.log("TMDb request...\nquery: ", query);

            if (data.results.length > 0) {
                //console.log("TMDb data: ", data);


                var index = data.results.findIndex(result => result.original_title.toLowerCase() === name.toLowerCase());

                if (index == -1) index = 0;
                data = data.results[index];

                var image_path = data.backdrop_path;

                var img = api_img_url + image_path;
                //console.log('TMDb image: ', img);
                if (image_path) {
                    document.getElementById(query).setAttribute("src", img);
                }
                else {
                    document.getElementById(query).style.display = 'none';
                }
                var tmbd_id = data.id;

                $('#' + query + '-image-modal-btn').click(function () {
                    $('#' + query + '-image-popup').attr('src', img);
                });

                $('#' + query + '-image-modal').on('shown.bs.modal', function (e) {
                    $('#' + query + '-image-popup').attr('src', img);
                });
               

            }
           

            
            



        },
        error: function (err) {
            console.clear()
        }
    });
    
    
}
