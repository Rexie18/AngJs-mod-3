(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
  var searchMenu = this;

    searchMenu.logMenuItems = function (enteredValue) {
    var promise = MenuCategoriesService.getMenuForCategory(enteredValue);

    promise.then(function (response) {
      searchMenu.result = response.data;
    })
    .catch(function (error) {
      return("Please Enter Menu Item.");
    })
  };

  searchMenu.remove = function (itemIndex){
  MenuCategoriesService.remove(itemIndex)
 };
  
}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  
  service.getMenuForCategory = function (enteredValue) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: enteredValue
      }
	   
    });

    return response;
  };

  service.remove = function(itemIndex){
		service.response.splice(itemIndex,1);
		};
}

})();


// http://plnkr.co/edit/452nFDmxnCROsM4m4Ylf?p=preview


// app.controller('MyController', function($http) {
//     var vm = this;
//     vm.mydata = [];

//     $http.get(URI)
//         .then(function(result) {
//           console.log(result);
//           vm.mydata = result.data;
//          });
