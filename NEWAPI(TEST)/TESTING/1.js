$().ready(function () {
    console.log("Making Request...")
    var rul = 'https://api.themoviedb.org/3/movie/popular?';//api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1
    var imgurl='https://image.tmdb.org/t/p/w500/'
    var result0img
    var result1img
    var result2img
    var result3img
    

    $.ajax({
        url: rul,

        data: {
            api_key: '19f84e11932abbc79e6d83f82d6d1045',
            anguage: "en-US",
            page: 1,
        },

        success: function (data) {
            console.log("Request Done")
            console.log(data);
            result0img = imgurl+data.results[0].poster_path;
            result1img = imgurl+data.results[1].poster_path;
            result2img = imgurl+data.results[2].poster_path;
            result3img = imgurl+data.results[3].poster_path;
            result4img = imgurl + data.results[4].poster_path;
            result5img = imgurl + data.results[5].poster_path;
            result6img = imgurl + data.results[6].poster_path;
            result7img = imgurl + data.results[7].poster_path;
            result8img = imgurl + data.results[8].poster_path;
            result9img = imgurl + data.results[9].poster_path;
            result10img = imgurl + data.results[10].poster_path;
            result11img = imgurl + data.results[11].poster_path;
            result12img = imgurl + data.results[12].poster_path;
            result13img = imgurl + data.results[12].poster_path;


            console.log(result0img);
            console.log(result1img);                                                                                            ///ALERT AAHAH EU SOU MESMO BURO AAHAH DEVIA TER USADO UM FOR PRA FAZER ESTA MERDA TODA MAS NÂO QUEIRA PENSAR MUITO RSS ALEM DO MAIS PRECISO ESTUDAR ALGA
            console.log(result2img);
            console.log(result3img);
            console.log(result4img);

            console.log(result5img);
            console.log(result6img);
            console.log(result7img);
            console.log(result8img);                                                                                            ///ALERT AAHAH EU SOU MESMO BURO AAHAH DEVIA TER USADO UM FOR PRA FAZER ESTA MERDA TODA MAS NÂO QUEIRA PENSAR MUITO RSS ALEM DO MAIS PRECISO ESTUDAR ALGA
            console.log(result9img);
            console.log(result10img);
            console.log(result11img);

            console.log(result12img);
            console.log(result13img);
           
            document.getElementById("result0img").setAttribute("src", result0img)
            document.getElementById("result1img").setAttribute("src", result1img)
            document.getElementById("result2img").setAttribute("src", result2img)
            document.getElementById("result3img").setAttribute("src", result3img)
            document.getElementById("result4img").setAttribute("src", result4img)
            document.getElementById("result5img").setAttribute("src", result5img)
            document.getElementById("result6img").setAttribute("src", result6img)
            document.getElementById("result7img").setAttribute("src", result7img)
            document.getElementById("result8img").setAttribute("src", result8img)
            document.getElementById("result9img").setAttribute("src", result9img)
            document.getElementById("result10img").setAttribute("src", result10img)
            document.getElementById("result11img").setAttribute("src", result11img)
            document.getElementById("result12img").setAttribute("src", result12img)
            document.getElementById("result13img").setAttribute("src", result13img)
    
            
            $("#result0").html(data.results[0].original_title)
            $("#result1").html(data.results[1].original_title)
            $("#result2").html(data.results[2].original_title)
            $("#result3").html(data.results[3].original_title)
            $("#result4").html(data.results[4].original_title)
            $("#result5").html(data.results[5].original_title)
            $("#result6").html(data.results[6].original_title)
            $("#result7").html(data.results[7].original_title)
            $("#result8").html(data.results[8].original_title)
            $("#result9").html(data.results[9].original_title)
            $("#result10").html(data.results[10].original_title)
            $("#result11").html(data.results[11].original_title)
            $("#result12").html(data.results[12].original_title)
            $("#result13").html(data.results[13].original_title)

            var a

            for (a = 0; a < 14; a++) {

                $(".p" + a).html("RELEASEDATE:"+data.results[a].release_date)


            }

            var a

            var self = this
            self.imgresults=ko.observableArray([])
            for (a = 0; a < 20; a++) {
                self.imgresults (imgurl + data.results[a].poster_path)
                //console.log("imagem:"+imgurl + data.results[a].poster_path)

                console.log(self.imgresults()) // Array of imgUrls cam be used to do someshit ahah 
            }
       
        },
       

    });










































    $('#carousel-example').on('slide.bs.carousel', function (e) {
        /*
            CC 2.0 License Iatek LLC 2018 - Attribution required
        */
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 4;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });

















})// JavaScript source code
