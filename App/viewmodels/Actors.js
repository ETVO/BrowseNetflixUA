
define(['durandal/app'], function (app) {
    var vm = function () {

        // Variáveis locais
        var self = this;
        self.baseUri = ko.observable('http://192.168.160.58/netflix/api/Actors');

        self.displayName = 'Actors';
        self.error = ko.observable('');
        self.notFound = ko.observableArray(['No actor was found.', 'More details:']);
        self.passingMessage = ko.observable('');

        self.records = ko.observableArray([]);

        self.currentPage = ko.observable(1);
        self.pageSize = ko.observable(PAGE_SIZE);

        self.totalRecords = ko.observable(50);

        self.hasPrevious = ko.observable(false);
        self.hasNext = ko.observable(false);
        self.previousPage = ko.computed(function () {
            return self.currentPage() * 1 - 1;
        }, self);

        self.nextPage = ko.computed(function () {
            return self.currentPage() * 1 + 1;
        }, self);

        self.fromRecord = ko.computed(function () {
            return self.previousPage() * self.pageSize() + 1;
        }, self);

        self.toRecord = ko.computed(function () {
            return Math.min(self.currentPage() * self.pageSize(), self.totalRecords());
        }, self);

        self.totalPages = ko.observable(0);

        function isHidden(el) {
            var style = window.getComputedStyle(el);
            return (style.display === 'none')
        };

        self.pageArray = function () {
            var list = [];
            var showNumber = 6;
            if (isHidden(document.getElementById('hide_sm'))) {
                showNumber = 3;
            }
            var size = Math.min(self.totalPages(), showNumber);
            var step;
            if (size < showNumber || self.currentPage() === 1)
                step = 0;
            else if (self.currentPage() >= self.totalPages() - Math.round(showNumber/2))
                step = self.totalPages() - showNumber;
            else
                step = Math.max(self.currentPage() - Math.round(showNumber / 2), 0);

            for (var i = 1; i <= size; i++)
                list.push(i + step);
            return list;
        };

        // Page Events
        self.activate = function (id) {
            showLoading();
            var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pageSize();
            ajaxHelper(composedUri, 'GET').done(function (data) {
                //console.log(data);

                hideLoading();

                self.records(data.Actors);
                self.currentPage(data.CurrentPage);
                self.hasNext(data.HasNext);
                self.hasPrevious(data.HasPrevious);
                self.pageSize(data.PageSize)
                self.totalPages(data.TotalPages);
                self.totalRecords(data.TotalActors);
                
                //self.SetFavourites();

            console.clear()
            });
            
            hideLoading();
        };


        self.getPoster = function (name) {

            if (name == '(T)ERROR') return;

            type = 'person';

            tmdbImage(name, type, false);
            
        };


        // start ....
        var pg = getUrlParameter('page');
        console.log("pg", pg);
        if (pg == undefined)
            self.activate(1);
    
        };
    
    return vm
});