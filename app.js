
var appname = angular.module('NarrowItDownApp',[]);
    appname.controller('NarrowItDownController', NarrowItDownController);
   appname.service('MenuSearchService', MenuSearchService);
   appname.directive('foundItems',FoundItems)

   NarrowItDownController.$inject=['MenuSearchService']

    
   function NarrowItDownController(MenuSearchService,$http){
     var ctrl = this;
      ctrl.searchCriteria = "";
      ctrl.message = "";
      ctrl.menuItemList = [];
      ctrl.removeMenuItem=function (index){
        console.log("Remove is called",index)
        ctrl.menuItemList.splice(index,1)
      }
      ctrl.searchItem = function () {
        ctrl.menuItemList.length=0;
        ctrl.message = "";
        if (ctrl.searchCriteria) {
          MenuSearchService.getMatchedMenuItems(ctrl.searchCriteria)
          .then(function(response){
           
            for(var i=0 ; i<response.data.menu_items.length ; i++){
           
            if(response.data.menu_items[i].description.indexOf(ctrl.searchCriteria)!=-1){
            
              ctrl.menuItemList.push(response.data.menu_items[i])
          
            }
            
          }
          if(ctrl.menuItemList.length==0)
           ctrl.message = 'Nothing Found';
          console.log("Item Count:",ctrl.menuItemList);
          console.log("Item Count:",ctrl.menuItemList.length);
          },function(error){
            console.log(error);
            ctrl.message='Nothing Found';
          })

         
       } else {
          ctrl.message = 'Nothing Found';
        }
      }
   }

   function MenuSearchService($http) {
      var menuService=this;
      menuService.message="";
      menuService.found=[];
      menuService.getMatchedMenuItems= function(searchCriteria){
 
       return $http({
          method: 'GET',
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json' 
        })
       
      }

    }

    function FoundItems(){
      var ddo={
        templateUrl:'loader/itemsloaderindicator.template.html',
        scope:{
           menuList:'<controllerMenuList',
           onRemove:'&'
          },
          controller:FoundItemDirectiveController,
          controllerAs:'dctrl',
          bindToController:true

          };
  
      
          return ddo;
    }


    function FoundItemDirectiveController(){
      var dctrl=this;
      
     

    }
    
     
     

     
   
    
