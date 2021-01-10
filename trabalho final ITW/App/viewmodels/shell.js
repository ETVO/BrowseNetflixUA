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
               

                { route: 'Movies', title: 'Moveis', moduleId: 'viewmodels/Movies', nav: true },
                { route: 'Movies(/:id)', title: 'Movies', moduleId: 'viewmodels/Movies', hash: '#Movies', nav: false },



                
                { route: 'Actors', title: 'Actors', moduleId: 'viewmodels/Actors', nav: true },
                { route: 'Actors(/:id)', title: 'Actors', moduleId: 'viewmodels/Actors', hash: '#Actors', nav: false },








                { route: 'MoviesDetails', title: 'Moveis', moduleId: 'viewmodels/MoviesDetails', nav: false },
                { route: 'MoviesDetails(/:id)', title: 'Movies Details', moduleId: 'viewmodels/MoviesDetails', hash: '#MoviesDetails', nav: false },

                { route: 'CategoriesDetails', title: 'Categories', moduleId: 'viewmodels/CategoriesDetails', nav: false },
                { route: 'CategoriesDetails(/:id)', title: 'Categories', moduleId: 'viewmodels/CategoriesDetails', hash: '#CategoriesDetails', nav: false },




                { route: 'MoviesByName(/:id)', title: 'Search movie by name', moduleId: 'viewmodels/MoviesByName', hash: '#MoviesByName', nav: true}

            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});