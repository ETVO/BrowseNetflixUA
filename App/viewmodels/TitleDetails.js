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

                var type = data.Type.Name.toLowerCase();

                if (data.Type.Name == 'TV Show') type = 'tv';

                tmdbImage(self.name(), type, false);
            });
            hideLoading();
        };

        self.enlargeImage = function (name) {

            var id = getIMDbSlug(name);

            if (id == '') return;

            var image = document.getElementById(id);

            image.classList.toggle('img-modal');

            console.log(image);
        }
    };

    return vm
});