<<<<<<< HEAD
﻿
=======
﻿const PAGE_SIZE = 20;

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
>>>>>>> 44539c206083828173eb1878f5115b5bcf4e1f47
requirejs.config({
    paths: {
        'text': '../vendors/Scripts/text',
        'durandal': '../vendors/Scripts/durandal',
        'plugins': '../vendors/Scripts/durandal/plugins',
        'transitions': '../vendors/Scripts/durandal/transitions',
        'bootstrap': '../vendors/Scripts/bootstrap.bundle'
    },
    "shim": {
        "bootstrap": ["jquery"]
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap'], function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Browse Netlix UA';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        //app.setRoot('viewmodels/shell', 'entrance');
        app.setRoot('viewmodels/shell');
    });
});





// Specific functions to access the IMDb API data
const imdb_api_url = 'https://sg.media-imdb.com/suggests/';
const imdb_url = 'https://www.imdb.com/';
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
function getIMDbURL(name) {
    name = getIMDbSlug(name);
    return imdb_api_url + name[0] + "/" + name + ".json";
}
function getIMDbSlug(title) {
    return title.trim().normalize("NFKD").replaceAll(/[^\-\w\s]/gi, '').trim().replaceAll(' ', '-').toLowerCase();
}

function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
           // console.log("AJAX Call[" + uri + "] Fail...");
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

function getIMDbIndex(data, name) {
    try {

        if (data.d.length == 0) return;

    } catch (err) {
      //  console.error("getIMDbImage ERROR: ", err);
        return;
    }


    if (data.d.length > 1 && name != null) {

        index = data.d.findIndex(i => i.l.toLowerCase() === name.toLowerCase());

        if (index == -1)
            return;

    }
    else
        index = 0;

    return index;
}

function getIMDbImage(data, index) {
    return data.d[index].i[0];
}

function showLoading() {
    console.log('show   ');
    $('#loadingModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}
function hideLoading() {
    $('#loadingModal').on('shown.bs.modal', function (e) {
        $("#loadingModal").modal('hide');
    });
    
}

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}