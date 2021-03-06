'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', ['$scope', 'categoryList',
  	function($scope, categoryList) {
  		$scope.categories = categoryList;

  }])
  .controller('AddExpenseCtrl', ['$scope', 'categoryList', 'expService', 'Flash',
  	function($scope, categoryList, expService, Flash) {
  		$scope.categories = categoryList;

  		$scope.submit = function() {
  			expService.saveExpense($scope.expense);
         var message = '<strong>Well done!</strong> Expense Added.';
        Flash.create('success', message, 'custom-class');
  		};

      $scope.resetForm = function() {
        console.log('starting reset');
        if ($scope.addForm) {
          console.log('found $scope.addForm');
          $scope.addForm.$setPristine();
          /* set the expense object to null to clear form fields */
          $scope.expense = '';

        }
        console.log('ending reset');
      };

  }])
  .controller('ViewSummaryCtrl', ['$scope', 'categoryList', 'expService', 'Flash',
  	function($scope, categoryList, expService, Flash) {
  		$scope.expenses = expService.getExpense();

      $scope.summaryData = [];

      var categories = categoryList;
      
      categories.forEach(function(item) {
        var catTotal = expService.getCategoryTotal(item);

        $scope.summaryData.push({
            category: item,
            amount: catTotal
        });


        /* remove the expense from the list */
      $scope.removeExpense = function(index) {
        $scope.expenses.splice(index,1);
      };

      /* call the deleteExpense function for this itemKey in services */
      $scope.deleteExpense = function(itemKey) {
        expService.deleteExpense(itemKey);
        var message = 'Expense Deleted.';
        Flash.create('danger', message, 'custom-class');
      };

    });
  	
  }])
.controller('NavigationCtrl',['$scope' ,'$location',
    function($scope,$location) {
      //var incrementer = 0;
      var navigator = function(incrementer) {
      var pages = ['/', '/add-expense', '/view-summary'];

      var nextUrl = "";
      var currentPage = $location.path();
      var lastPageIndex = pages.length - 1;
      var pageIndex = pages.indexOf(currentPage);
      var direction = pageIndex + incrementer;
      if (direction === -1) direction = lastPageIndex;
      if (direction > lastPageIndex) direction = 0;
      nextUrl = pages[direction];
      $location.url(nextUrl);

      $scope.slidingDirection = (incrementer === 1) ? 'slide-right' : 'slide-left';
    };

    

    $scope.goLeft = function() {
      navigator(-1);
    };
    $scope.goRight = function() {
      navigator(1);
    };
    

}



]);
