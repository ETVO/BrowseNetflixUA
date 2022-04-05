define(['plugins/router', 'durandal/app'], function (router, app) {
    
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {

            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true },
               
                { route: 'Titles', title: 'Titles', moduleId: 'viewmodels/Titles', nav: true },
                { route: 'Titles(/:id)', title: 'Titles', moduleId: 'viewmodels/Titles', hash: '#Titles', nav: false },
                
                { route: 'Actors', title: 'Actors', moduleId: 'viewmodels/Actors', nav: true },
                { route: 'Actors(/:id)', title: 'Actors', moduleId: 'viewmodels/Actors', hash: '#Actors', nav: false },

                { route: 'TitleDetails', title: 'Title', moduleId: 'viewmodels/TitleDetails', nav: false },
                { route: 'TitleDetails(/:id)', title: 'Title Details', moduleId: 'viewmodels/TitleDetails', hash: '#TitleDetails', nav: false },

                { route: 'ActorDetails', title: 'Actor', moduleId: 'viewmodels/ActorDetails', nav: false },
                { route: 'ActorDetails(/:id)', title: 'Actor Details', moduleId: 'viewmodels/ActorDetails', hash: '#ActorDetails', nav: false },

                { route: 'DirectorDetails', title: 'Director', moduleId: 'viewmodels/DirectorDetails', nav: false },
                { route: 'DirectorDetails(/:id)', title: 'Director Details', moduleId: 'viewmodels/DirectorDetails', hash: '#DirectorDetails', nav: false },

                { route: 'CategoriesDetails', title: 'Categories', moduleId: 'viewmodels/CategoriesDetails', nav: false },
                { route: 'CategoriesDetails(/:id)', title: 'Categories', moduleId: 'viewmodels/CategoriesDetails', hash: '#CategoriesDetails', nav: false },

                { route: 'SearchTitles(/:id)', title: 'Search Titles', moduleId: 'viewmodels/SearchTitles', hash: '#SearchTitles', nav: true}

            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});