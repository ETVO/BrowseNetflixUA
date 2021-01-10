// JavaScript source code
define(['durandal/app'], function (app) {
    // ViewModel KnockOut

    var vm = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        self.baseUri = ko.observable('http://192.168.160.58/netflix/api/Categories/');
        self.displayName = 'Categoria';

        self.records = ko.observableArray([]);

        self.Id = ko.observable();
        self.Name = ko.observable();
 
        //--- Page Events
        self.activate = function (id) {
            console.log('CALL: getCategory...');
            var composedUri = self.baseUri()+id;
            ajaxHelper(composedUri, 'GET').done(function (data) {
                console.log(data);
      
                self.records(data.Titles);
                self.Id(data.Id);
                self.Name(data.Name);
               
            });
        };
        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    
                  
                }
            });

        }
        
       
    };

    return vm


});