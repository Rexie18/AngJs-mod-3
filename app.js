(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundDirective)
.config(function($sceProvider);


function FoundDirective($sceProvider.enabled(false)) {
  var ddo = {
    templateUrl:'https://davids-restaurant.herokuapp.com/menu_items.json',
    scope: {
      check:"<checkAny",
      searchResult:"<foundList",
      onRemove : "&"
    }
  };

  return ddo;
}

NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
    var search = this;
    search.searchTerm = "";
    search.nothing = false;

    search.getList = function(){
      if(search.searchTerm.length === 0) {
        search.nothing = true;
        search.found = [];
      } else {
         MenuSearchService.getMatchedMenuItems(search.searchTerm)
         .then(function(response){
           if (response.length===0) {
             search.nothing = true;
           } else{
             search.nothing = false;
           }
           search.found = response;
         });
      }
    };

    search.remove = function(index) {
      search.found = MenuSearchService.remove(index);
    };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method:"GET",
      url:"https://davids-restaurant.herokuapp.com/menu_items.json"
    });

    foundItems = [];

    return response.then(function(response){
      var menus = response.data.menu_items;
      for (var i=0;i<menus.length;i++) {
        var menuDesc = menus[i].description.toLowerCase();
        if (menuDesc.includes(searchTerm.toLowerCase())) {
          foundItems.push(menus[i]);
        }
      }
      return foundItems;
    })
    .catch(function(error){
      console.log("Something went wrong~!");
    });
  };

  service.remove = function(index) {
    foundItems.splice(index,1);
    return foundItems;
  };

}

})();

// (function(){
// 'use strict';

// angular.module('NarrowItDownApp',[])
// .controller('NarrowItDownController', NarrowItDownController)
// .service('MenuSearchService', MenuSearchService)
// .directive('foundItems', FoundDirective);


// function FoundDirective() {
//   var ddo = {
//     templateUrl:'https://davids-restaurant.herokuapp.com/component/list.html',
//     scope: {
//       check:"<checkAny",
//       searchResult:"<foundList",
//       onRemove : "&"
//     }
//   }

//   return ddo
// }

// NarrowItDownController.$inject=['MenuSearchService']
// function NarrowItDownController (MenuSearchService) {
//     var search = this;
//     search.searchTerm = "";
//     search.nothing = false;

//     search.getList = function(){
//       if(search.searchTerm.length == 0) {
//         search.nothing = true;
//         search.found = [];
//       } else {
//          MenuSearchService.getMatchedMenuItems(search.searchTerm)
//          .then(function(response){
//            if (response.length==0) {
//              search.nothing = true;
//            } else{
//              search.nothing = false;
//            }
//            search.found = response;
//          });
//       }
//     };

//     search.remove = function(index) {
//       search.found = MenuSearchService.remove(index);
//     };
// }

// MenuSearchService.$inject = ['$http']
// function MenuSearchService ($http) {
//   var service = this;
//   var foundItems = [];

//   service.getMatchedMenuItems = function (searchTerm) {
//     var response = $http({
//       method:"GET",
//       url:"https://davids-restaurant.herokuapp.com/menu_items.json"
//     });

//     foundItems = [];

//     return response.then(function(response){
//       var menus = response.data.menu_items;
//       for (var i=0;i<menus.length;i++) {
//         var menuDesc = menus[i].description.toLowerCase()
//         if (menuDesc.includes(searchTerm.toLowerCase())) {
//           foundItems.push(menus[i]);
//         }
//       }
//       return foundItems;
//     })
//     .catch(function(error){
//       console.log("Something went wrong~!")
//     });
//   };

//   service.remove = function(index) {
//     foundItems.splice(index,1);
//     return foundItems;
//   };

// }

// })();
