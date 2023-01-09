(function(){
    'use strict';

    angular.module('MenuCategoriesApp', [])
    .controller('MenuCategoriesController', MenuCategoriesController)
    .service('MenuCategoriesService', MenuCategoriesService);

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService){
        var menu = this;

        var promise = MenuCategoriesService.getMenuCategories();

        promise
        .then(function(response){
            menu.categories = response.data;
        })
        .catch(function(error){
            console.log('Something went terribly wrong!');
        });
    };

    MenuCategoriesService.$inject = ['$http'];
    function MenuCategoriesService($http){
        var service = this;

        service.getMenuCategories = function(){
            var response = $http({
                method: "GET",
                url:('https://coursera-jhu-default-rtdb.firebaseio.com/categories.json')
            });

            return response;
        };
    };

})();