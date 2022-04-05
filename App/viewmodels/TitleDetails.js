define(['durandal/app'], function (app) {
    var vm = function () {
        console.log('ViewModel initiated...');

        var self = this;
        self.baseUri = ko.observable('http://192.168.160.58/netflix/api/titles/');

        self.displayName = 'Title Details';
        self.error = ko.observable('');
        self.passingMessage = ko.observable('');

        self.actors = ko.observableArray('');
        self.categories = ko.observableArray('');
        self.countries = ko.observableArray('');
        self.dateAdded = ko.observable('');
        self.description = ko.observable('');
        self.directors = ko.observableArray('');
        self.duration = ko.observable('');
        self.id = ko.observable('');
        self.name = ko.observable('');
        self.rating = ko.observable('');
        self.releaseYear = ko.observable('');
        self.type = ko.observable('');

        self.getDateAdded = () => {
            console.log('date added', self.dateAdded());
            if (self.dateAdded() == null) return '';
            var d = new Date(self.dateAdded());

            var day = d.getDay();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();

            return day.pad(2) + '/' + month.pad(2) + '/' + year.pad(4);
        }


        self.activate = function (id) {
            console.log('CALL: getTitle...');
            var composedUri = self.baseUri() + id;
            ajaxHelper(composedUri, 'GET').done(function (data) {
                //console.log(data);

                self.actors(data.Actors);
                self.categories(data.Categories);
                self.countries(data.Countries);
                self.dateAdded(data.DateAdded);
                self.description(data.Description);
                self.directors(data.Directors);
                self.duration(data.Duration);
                self.id(data.Id);
                self.name(data.Name);
                self.rating(data.Rating);
                self.releaseYear(data.ReleaseYear);
                self.type(data.Type);
                
                function getTMDbSlug(name) {
                    return name.trim().normalize("NFKD").replaceAll(/[^\-\w\s]/gi, '').trim().replaceAll(' ', '-').toLowerCase();
                }
                var nome=getTMDbSlug(data.Name)

                var type = data.Type.Name.toLowerCase();
                tmdbImage(self.name(), type, false);

                if (data.Type.Name == 'TV Show') type = 'tv';

            
               
                
                const api_search_url = "https://api.themoviedb.org/3/search/"+type
                const api_movie_url = "https://api.themoviedb.org/3/";
                const api_key = '19f84e11932abbc79e6d83f82d6d1045';
                const youtube_url = 'https://www.youtube.com/embed/';


                
                
                $.ajax({
                    url: "https://api.themoviedb.org/3/search/"+type+"?api_key=19f84e11932abbc79e6d83f82d6d1045&query="+nome,
                    data: {
                        
                       
                    },
                    success: function (data) {
                        //console.log("TMDb specific data: ", data);

                        if(data.results.length>0){
                            if(type == 'movie')
                                 var index = data.results.findIndex(result => result.original_title.toLowerCase() === name.toLowerCase());
                            else
                            var index = data.results.findIndex(result => result.name.toLowerCase() === name.toLowerCase());

                            if (index == -1) index = 0;
                            data = data.results[index];
                            
                            var tmdbid =data.id
                            const videourl="https://api.themoviedb.org/3/"+type+"/"+tmdbid+"+?api_key=19f84e11932abbc79e6d83f82d6d1045&append_to_response=videos"
                            

                            $.ajax({url: videourl, success: function(data){
                            
                            if(data.videos.results[0]!=undefined){
                            var elem=document.getElementById("modal").style.display="block"
                            var youtubekey=data.videos.results[0].key
                            var linkvideo=youtube_url+youtubekey        
                            }
                        


                            var urlmodal = $("#cartoonVideo").attr('src');
                            $("#myModal").on('hide.bs.modal', function(){
                                $("#cartoonVideo").attr('src', linkvideo);
                            });
                            
                            /* Assign the initially stored url back to the iframe src
                            attribute when modal is displayed again */
                            $("#myModal").on('show.bs.modal', function(){
                                $("#cartoonVideo").attr('src', linkvideo);
                            });
                            
                       
                            
                            

                            },
                           
                            
                            error: function(err){
                                
                                console.log("Não Foi possivel encontrar video")
                            }
                            
                        });
                           

                        }
                    },
                    error: function (err) {
                        console.clear()

                    }
                });


            });
            hideLoading();
            

        






















        };

        self.enlargeImage = function (name) {

            var id = getIMDbSlug(name);
            

            if (id == '') return;

            var image = document.getElementById(id);

            image.classList.toggle('img-modal');

        }
    };

    return vm
});