const imdb_api_url = 'https://sg.media-imdb.com/suggests/';
const imdb_url = "https://www.imdb.com/";
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

window.onload = () => {
    document.getElementById("url").placeholder = imdb_api_url;
};

function tryItOut(e) {
    var titleField = document.getElementById('title');
    titleField.value = e.innerText;
    $('#get').click();
} 

function doCORSRequest(options, getResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function () {
        getResult((x.responseText || ''));
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
}
// function doCORSRequest(options, printResult) {
//     var x = new XMLHttpRequest();
//     x.open(options.method, cors_api_url + options.url);
//     x.onload = x.onerror = function () {
//         printResult(
//             (x.responseText || '')
//         );
//     };
//     if (/^POST/i.test(options.method)) {
//         x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     }
//     x.send(options.data);
// }

// Bind event
(function () {
    var data;
    var urlField = document.getElementById('url');
    var titleField = document.getElementById('title');
    var outputField = document.getElementById('output');
    document.getElementById('get').onclick = function (e) {

        if (titleField.value !== "") {
            urlField.value = getAPIURL(titleField.value);
        } else {
            alert("Fill the fields title or url");
            return;
        }
        e.preventDefault();
        doCORSRequest({
            method: 'GET',
            url: urlField.value
        }, function (result) {
            result = result.replace("imdb$" + getTitleSlug(titleField.value) + "(", '').slice(0, -1);
            data = JSON.parse(result);
            outputField.innerHTML = JSON.stringify(data, null, "  ");
            outputField.innerHTML = urlify(outputField.innerHTML);

            console.log(data);
            printTable(data);

            return hljs.highlightBlock(outputField);
        });

    };


})();

function printTable(data) {
    var result = document.getElementById('result');
    result.style = "display:none";

    var error = document.getElementById('error');
    error.innerHTML = "";

    var titleField = document.getElementById('title');
    var title = titleField.value;

    var index;

    try {
        
        if(data.d.length == 0) return;
        
    } catch (err) {
        error.innerHTML = "Not found";
        return;
    }


    if(data.d.length > 1) {

        index = data.d.findIndex(i => i.l.toLowerCase() === title.toLowerCase());
    
        if (index == -1) {
            return;
        }

    }
    else
        index = 0;

    var name = data.d[index].l;
    var id = data.d[index].id;
    var type = "";
    var desc = data.d[index].s;
    var year = data.d[index].y || "";
    var imgUrl = data.d[index].i[0];

    switch (id.substring(0, 2)) {
        case 'tt':
            type = "title";
            break;

        case 'nm':
            type = "name";
            break;

        case 'vi':
            type = "video";
            break;

        default:
            type = "title";
    }

    var url = imdb_url + type + "/" + id;

    if (type == 'title') {

        if (desc != "") {
            var actors = [];

            desc.split(', ').forEach(actorName => {

                actors.push('<a href="" id="' + getTitleSlug(actorName) + '" target="_blank">' + actorName + '</a>');
                getActorURL(actorName);
            });

            desc = "Stars<br>" + actors.join('<br>');
        }
    }

    // <th scope="col">Name</th>
    // <th scope="col">IMBD link</th>
    // <th scope="col">Description</th>
    // <th scope="col">Release year</th>
    // <th scope="col">Poster</th>

    document.getElementById("name").innerHTML = name;
    document.getElementById("titleURL").setAttribute("href", url);
    document.getElementById("desc").innerHTML = desc;
    document.getElementById("year").innerHTML = year;
    document.getElementById("img").setAttribute("src", imgUrl);

    result.style = "";
}

function getActorURL(name, titleId) {
    var actorURL = "";
    
    url = getAPIURL(name);
    
    doCORSRequest({
        method: 'GET',
        url: url
    }, (result) => {
        result = result.replace("imdb$" + getTitleSlug(name) + "(", '').slice(0, -1);
        data = JSON.parse(result);

        console.log(name, data);

        var index = data.d.findIndex(i => i.l.toLowerCase().replace(/\(([^)]+)\)/, '').trim() === name.toLowerCase());

        if (index == -1)
            actorURL = '#';
        else
            actorURL = imdb_url + "name/" + data.d[index].id;

        document.getElementById(getTitleSlug(name)).setAttribute("href", actorURL);
    });
}

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

function getAPIURL(title) {
    var name = title.trim().normalize("NFKD").replaceAll(/[^\w\s]/gi, '').replaceAll(' ', '-').toLowerCase();

    var url = imdb_api_url + name[0] + "/" + name + ".json";

    return url;
}

function getTitleSlug(title) {
    var name = title.trim().normalize("NFKD").replaceAll(/[^\w\s]/gi, '').replaceAll(' ', '-').toLowerCase();

    return name;
}


if (typeof console === 'object') {
    console.log('// To test a local CORS Anywhere server, set cors_api_url. For example:');
    console.log('cors_api_url = "http://localhost:8080/"');
}