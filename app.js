(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'https://davids-restaurant.herokuapp.com/menu_items',
    scope: {
      items: '<',
      menuItem: '@menuItem',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var found = this;

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var found = this;

  found.getMatchedMenuItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems();

    promise.then(function (response) {
      var items = response.data.menu_items;

      found.items = [];
      if(found.searchTerm) {
        var lowerSearchTerm = found.searchTerm.toLowerCase();

        for(var i = 0; i < items.length; i++) {
          var item = items[i].name.toLowerCase();

          if(item.includes(lowerSearchTerm)) {
            found.items.push(items[i]);
          
          }
        }
      }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    })
  };

  found.removeItem = function (itemIndex) {
    found.items.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function() {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

}

})();
