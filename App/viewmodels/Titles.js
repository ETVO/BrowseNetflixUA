const PAGE_SIZE = 20;

define(['durandal/app'], function (app) {
    var vm = function () {
        
        // Variáveis locais
        var self = this;
        self.baseUri = ko.observable('http://192.168.160.58/netflix/api/Titles');

        self.displayName = 'Titles';
        self.error = ko.observable('');
        self.notFound = ko.observableArray(['No title was found.', 'More details:']);
        self.passingMessage = ko.observable('');

        self.detailsHref = ko.observable('#TitleDetails/');

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

        self.pageArray = function () {
            var list = [];
            var showNumber = 6;
            var size = Math.min(self.totalPages(), showNumber);
            var step;
            if (size < showNumber || self.currentPage() === 1)
                step = 0;
            else if (self.currentPage() >= self.totalPages() - Math.round(showNumber/2))
                step = self.totalPages() - showNumber;
            else
                step = Math.max(self.currentPage() - 5, 0);

            for (var i = 1; i <= size; i++)
                list.push(i + step);
            return list;
        };

        // Page Events
        self.activate = function (id) {
            console.log('CALL: getTitle...');
            var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pageSize();
            ajaxHelper(composedUri, 'GET').done(function (data) {
                console.log(data);

                self.records(data.Titles);
                self.currentPage(data.CurrentPage);
                self.hasNext(data.HasNext);
                self.hasPrevious(data.HasPrevious);
                self.pageSize(data.PageSize)
                self.totalPages(data.TotalPages);
                self.totalRecords(data.TotalTitles);
                //self.SetFavourites();

            });
        };

        // Internal functions
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

        };
       
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

        // start ....
        var pg = getUrlParameter('page');
        console.log(pg);
        if (pg == undefined)
            self.activate(1);
        else {
            self.activate(pg);
        }
    };
    return vm
});