define(['durandal/app'], function (app) {
    var vm = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        self.baseUri = ko.observable('http://192.168.160.58/netflix/api/titles/');
        self.displayName = 'Detalhes do Filme ';
        self.error = ko.observable('');
        self.passingMessage = ko.observable('');
        //--- Data Record
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
        //--- Page Events
        self.activate = function (id) {
            console.log('CALL: getTitle...');
            var composedUri = self.baseUri() + id;
            ajaxHelper(composedUri, 'GET').done(function (data) {
                console.log(data);
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
            });
        };
        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
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
       

        function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        };
        //--- start ....
        var pg = getUrlParameter('id');
        console.log(pg);
        if (pg == undefined)
            self.activate(1);
        else {
            self.activate(pg);
        }
    };

    return vm
});