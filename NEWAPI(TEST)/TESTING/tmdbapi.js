$().ready(function () {
    $("#a").click(function () {
        var valor = $("#search").val();
        console.log(valor)
        var youtubeuurl = 'https://www.youtube.com/watch?v='
        var urlimages = 'https://image.tmdb.org/t/p/w500/'
        var semimagemurl =' data:image/png;base64,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'
        var video = "";
        valor=valor.replaceAll(" ","+")

        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie",
            data: {
                api_key:'19f84e11932abbc79e6d83f82d6d1045',
               
                query : valor
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

                    $("#nomefilme").html(data.original_title).css({ "color": "red", "font-family": "Cursive" })
                    $("#ca").html(data.overview)

                    $("#tit").html("Resultado mais proximo")





                    $.ajax({
                        url: "https://api.themoviedb.org/3/movie/" + idtmbd + "?api_key=19f84e11932abbc79e6d83f82d6d1045&append_to_response=videos",

                        success: function (data) {
                            console.log(data)

                            if (data.videos.results.length>0) {

                                console.log("isooooooo:  " + youtubeuurl + data.videos.results[0].key)
                                var videolink = youtubeuurl + data.videos.results[0].key
                                video = data.videos.results[0].key
                                document.getElementById("vervideo").setAttribute("href", videolink)
                            }
                            else {
                                console.log("Sem videos")
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
                            url: "https://api.themoviedb.org/3/movie/" + idtmbd +"?api_key=19f84e11932abbc79e6d83f82d6d1045&append_to_response=videos",
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
                                if (data.production_companies.length>0 && data.production_companies[0].logo_path) {
                                    self.production_companies(data.production_companies[0].logo_path)
                                    var imgempresa = urlimages + self.production_companies()
                                    console.log("logoempresa:  "+imgempresa)
                                    document.getElementById("cardimg2").setAttribute("src", imgempresa);
                                   
                                }
                                else {
                                    document.getElementById("cardimg2").setAttribute("src", semimagemurl);

                                    
                                }
                                
                                $("#l1").html("IMDBID: " + self.imdb_id());
                                $("#l2").html("Popularit: " + self.popularit());
                                $("#l3").html("Release_date: " + self.release_date());
                                $("#l4").html("Runtime: " + self.runtime());

                                console.log(self.imdb_id())
                                console.log(self.popularit())
                                console.log(self.release_date())
                                console.log(self.runtime())

                            

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




        








    });






    




});





























