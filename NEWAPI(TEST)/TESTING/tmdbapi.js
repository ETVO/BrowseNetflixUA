$().ready(function () {
    $("#a").click(function () {
        var valor = $("#search").val();
        console.log(valor)
        var youtubeuurl = 'https://www.youtube.com/watch?v='
        var urlimages = 'https://image.tmdb.org/t/p/w500/'
        var semimagemurl =' https://lh3.googleusercontent.com/proxy/npf9OZGh-pu0Aka815X_ibFeI9MJ1EqDovJlb4B3NGdhYytPLQ787WVqZVbi-4Ba9VD7waxE2gZAOawVj8WURrFQCk9Lp7smDMZjFbkb03JQqa2nFIHrXJf7HYrs_2A4IAuUvyqlgIJYiwzbpS7SIlToNGMzEVjSTRS1eb9ftakq_AgqhQsp'
       
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
                                document.getElementById("vervideo").setAttribute("href", videolink)
                            }
                            else {
                                console.log("Sem videos")
                            }



                        },
                        error: function () { console.log("Fatal Error") }


                    });







                    $("#ver").click(function () {
                        var idtmbd = data.id;





                        $('#myModal').modal('show'); 

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
                                    console.log(imgempresa)
                                    document.getElementById("img2").setAttribute("src", imgempresa);
                                   
                                }
                                else {
                                    document.getElementById("img2").setAttribute("src", semimagemurl);

                                    
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





























