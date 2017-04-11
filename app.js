(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
  var menu = this;

    menu.logMenuItems = function (shortName) {
    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      menu.categories = response.data;
    })
    .catch(function (error) {
      return("Please Enter Menu Item.");
    })
  };

  menu.remove = function (itemIndex){
  MenuCategoriesService.remove(itemIndex)
 };
  
}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  
  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

  service.remove = function(itemIndex){
		service.response.splice(itemIndex,1);
		};
}

})();
