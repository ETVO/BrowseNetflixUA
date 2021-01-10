define(['durandal/app'], function (app) {
    var vm = function () {
        console.log('SingleNetflixPage initiated...');
        var self = this;
        // IMPORTANTE: alterar o URL base nos diferentes ficheiros javascript
        var baseUrl = 'http://192.168.160.58/netflix/api/Search/Movies?name=';
        self.displayName = 'Search Movies by name';
        self.Movies = ko.observableArray([]);
        console.log(self.Movies)
        self.error = ko.observable('');
        //--- Page Events
        self.searchMovies = ko.observable();

        getMovies = function () {
            var composedUrl = baseUrl + self.searchMovies();
            ajaxHelper(composedUrl, 'GET').done(function (data) {
                // IMPORTANTE: Adicionarem ao array próprio do knockout a informacao que recebem da API
                if(data.length == 0)
                    alert("Sem Filmes!");
                else
                    self.Movies(data);
                console.log(data);
            });
        }

       
        function ajaxHelper(uri, method, data) {
            self.error('Filme nao encontrado'); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            });
        }
        
    };
    return vm;
});