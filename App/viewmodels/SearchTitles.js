
define(['durandal/app'], function (app) {
    var vm = function () {

        // Variáveis locais
        var self = this;
        self.baseUri = ko.observable('http://192.168.160.58/netflix/api/Search/Titles?name=');

        self.displayName = 'Search Titles';
        self.error = ko.observable('');
        self.notFound = ko.observableArray(['No title was found.', 'More details:']);

        self.records = ko.observableArray([]);

        self.query = ko.observable();

        self.first = ko.observable(true);

        getTitles = function () {
            var composedUrl = self.baseUri() + self.query();
            ajaxHelper(composedUrl, 'GET').done(function (data) {
                self.first(false);
                if (data.length != 0) {

                    console.log(data);

                    hideLoading();

                    self.records(data);
                }
            });
        }

        self.getPoster = function (name, typeName) {

            if (name == '(T)ERROR') return;

            var type = typeName.toLowerCase();

            if (typeName == 'TV Show') type = 'tv';

            tmdbImage(name, type, false);
        };

        self.activate = function () {
            self.first(true);
        }
    };
    return vm
});