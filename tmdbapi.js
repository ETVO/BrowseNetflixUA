$().ready(function () {
    $("#a").on( 'tap click',function () {
        var valor = $("#search").val();
        console.log(valor)
        var youtubeuurl = 'https://www.youtube.com/watch?v='
        var urlimages = 'https://image.tmdb.org/t/p/w500/'
        var semimagemurl =' https://lh3.googleusercontent.com/proxy/l5UKFcIfn0BiNuHEOipNtZD-k4Uo25EpBUQwRSkC7_b6NlpvkP5BBXsUKvgWWHHImWkdz5N1UEaIWLCW51SqjiiAuvnCWSHgwk0uYzwJRuW2nh04P03cU8Hxh5NAutLdGgeARHWqKuvkP67YgrjBenWINRS2NedWg2DSshrkMy8yfqgG2p0I'
        var video = "";
        valor = valor.replaceAll(" ", "+")

        var n = $("input:checked").length;

        if (n > 1) {
            alert("Tens de escolher Apenas Uma")
        }

        else if ($("input:checked").val() == "movie") {
            $.ajax({
                url: "https://api.themoviedb.org/3/search/movie",
                data: {
                    api_key: '19f84e11932abbc79e6d83f82d6d1045',

                    query: valor
                },
                success: function (data) {
                    console.log("Fazendo request....")

                    if (data.results.length > 0) {
                        console.log("done")
                        console.log(data)
                        data = data.results[0]
                        //console.log(data)

                        var ima = urlimages + data.poster_path
                        console.log(ima)
                        if (data.poster_path) {
                            document.getElementById("img").setAttribute("src", ima);
                        }
                        else {

                            document.getElementById("img").setAttribute("src", semimagemurl);
                        }
                        var idtmbd = data.id;

                        $("#nomefilme").html(data.original_title).css({ "color": "white ", "font-family": "Cursive" })
                        $("#ca").html(data.overview)

                        $("#tit").html("Resultado mais proximo")





                        $.ajax({
                            url: "https://api.themoviedb.org/3/movie/" + idtmbd + "?api_key=19f84e11932abbc79e6d83f82d6d1045&append_to_response=videos",

                            success: function (data) {
                                console.log(data)

                                if (data.videos.results.length > 0) {

                                    console.log("isooooooo:  " + youtubeuurl + data.videos.results[0].key)
                                    var videolink = youtubeuurl + data.videos.results[0].key
                                    video = data.videos.results[0].key
                                    document.getElementById("vervideo").setAttribute("href", videolink)
                                }
                                else {
                                    console.log("Sem videos")
                                    alert("Sem Videos Relacionados ")
                                }



                            },
                            error: function () { console.log("Fatal Error") }


                        });






                        var $videoSrc;
                        $('.video-btn').click(function () {
                            $videoSrc = 'https://www.youtube.com/embed/' + video;
                        });
                        console.log($videoSrc);



                        // when the modal is opened autoplay it  
                        $('#myModal').on('shown.bs.modal', function (e) {

                            // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
                            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
                        })



                        // stop playing the youtube video when I close the modal
                        $('#myModal').on('hide.bs.modal', function (e) {
                            // a poor man's stop video
                            $("#video").attr('src', $videoSrc);
                        })












                        $("#vermais").click(function () {

                            var idtmbd = data.id;





                            $('#secondmodal').modal('show');

                            var self = this;

                            self.idd = ko.observable();
                            self.imdb_id = ko.observable();
                            self.popularit = ko.observable();
                            self.release_date = ko.observable();
                            self.runtime = ko.observable();
                            self.production_companies = ko.observable();

                            //api_key={api_key}&append_to_response=videos
                            $.ajax({
                                url: "https://api.themoviedb.org/3/movie/" + idtmbd + "?api_key=19f84e11932abbc79e6d83f82d6d1045&append_to_response=videos",
                                success: function (data) {

                                    //var key = data.videos.resuult[0].key
                                    //console.log("video youtube:"+key)
                                    console.log("feito consequiste pegar os detalhes do filme")
                                    console.log(data)

                                    self.idd(data.id);
                                    self.imdb_id(data.imdb_id);
                                    self.popularit(data.popularity)
                                    self.release_date(data.release_date)
                                    self.runtime(data.runtime)
                                    if (data.production_companies.length > 0 && data.production_companies[0].logo_path) {
                                        self.production_companies(data.production_companies[0].logo_path)
                                        var imgempresa = urlimages + self.production_companies()
                                        console.log("logoempresa:  " + imgempresa)
                                        document.getElementById("cardimg2").setAttribute("src", imgempresa);

                                    }
                                    else {
                                        document.getElementById("cardimg2").setAttribute("src", semimagemurl);


                                    }

                                    $("#l1").html("IMDBID: " + self.imdb_id());
                                    $("#l2").html("Popularit: " + self.popularit());
                                    $("#l3").html("Release_date: " + self.release_date());
                                    $("#l4").html("Runtime: " + self.runtime());
                                    console.log(data.homepage);
                                    $("#l5").html(data.homepage);


                                    document.getElementById("l5").setAttribute("href", data.homepage);


                                    console.log(self.imdb_id());
                                    console.log(self.popularit());
                                    console.log(self.release_date());
                                    console.log(self.runtime());



                                }

                            });










                        });

                        // console.log(data.results[0].id) //sabendo o id posso buscar da api os detalhes do filme ou serie
                    }
                    else {

                        console.log("done")
                        alert("Sem dados")
                        console.log("Sem dados")
                    }




                },
                error: function () {

                    alert('Erro!');
                }
            });







        } else if ($("input:checked").val() == "serie") {
            console.log("isoooooooooo")


            $.ajax({
                url: 'https://api.themoviedb.org/3/search/tv?',
                data: {
                    api_key: '19f84e11932abbc79e6d83f82d6d1045',
                    query: valor,

                },

                success: function (data) {

                    console.log(data);




                    var nome = data.results[0].name;
                    var sinopse = data.results[0].overview;
                    var id = data.results[0].id;

                    var img = urlimages + data.results[0].poster_path;
                    console.log(img)

                    if (data.results[0].poster_path) {
                        document.getElementById("img").setAttribute("src", img);
                    }
                    else {

                        document.getElementById("img").setAttribute("src", semimagemurl);
                    }


                    $("#nomefilme").html(nome).css({ "color": "red", "font-family": "Cursive" })
                    $("#ca").html(sinopse)

                    $("#tit").html("Resultado mais proximo")




                    $.ajax({
                        url: 'https://api.themoviedb.org/3/tv/' + id + '/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US',

                        success: function (data) {



                            var video = 'https://www.youtube.com/embed/' + data.results[0].key;
                            console.log(video)
                            document.getElementById("vervideo").setAttribute("href", video)
                            console.log(data.results[0])




                            $("#vermais").click(function () {

                                $('#secondmodal').modal('show');



                                $.ajax({

                                    url: 'https://api.themoviedb.org/3/tv/' + id + '?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US',

                                    success: function (data) {
                                        console.log(data)
                                        $("#l3").html("ID: " + data.id);
                                        $("#l2").html("first_air_date: " + data.first_air_date);
                                        $("#l1").html("Criado por : " + data.created_by[0].name);
                                        $("#l4").html("languages: " + data.languages);






                                        if (data.created_by.length > 0 && data.created_by[0].profile_path) {


                                            document.getElementById("cardimg2").setAttribute("src", urlimages + data.created_by[0].profile_path);

                                        }
                                        else {
                                            document.getElementById("cardimg2").setAttribute("src", semimagemurl);


                                        }




                                        ;


                                        $("#l5").html(data.homepage);

                                        document.getElementById("l5").setAttribute("href", data.homepage);
                                    }


                                })





                            });

























                            var $videoSrc;
                            $('.video-btn').click(function () {
                                $videoSrc = 'https://www.youtube.com/embed/' + video;
                            });




                            // when the modal is opened autoplay it  
                            $('#myModal').on('shown.bs.modal', function (e) {

                                // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
                                $("#video").attr('src', video + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
                            })



                            // stop playing the youtube video when I close the modal
                            $('#myModal').on('hide.bs.modal', function (e) {
                                // a poor man's stop video
                                $("#video").attr('src', video);
                            })


                        }


                    })



                }



            })






        } else if ($("input:checked").val() == "actor") {
            alert("----Ainda Nao Implementado----")
         
        }





    });






    




});





























