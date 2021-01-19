define(['durandal/app'], function (app) {
    var vm = function () {
        console.log('ViewModel initiated...');

        var self = this;
        self.baseUri = ko.observable('http://192.168.160.58/netflix/api/directors/');

        self.displayName = 'Director Details';
        self.error = ko.observable('');
        self.passingMessage = ko.observable('');


        self.name = ko.observable('');
        self.records = ko.observable('');


        self.activate = function (id) {
            console.log('CALL: getTitle...');
            var composedUri = self.baseUri() + id;
            ajaxHelper(composedUri, 'GET').done(function (data) {
                console.log(data);

                self.name(data.Name);
                self.records(data.Titles);

                var type = 'person';

                tmdbImage(self.name(), type, false);

            });
            hideLoading();
        };
    };

    return vm
});