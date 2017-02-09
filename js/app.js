var chipping = angular.module("chipping", []).controller('calculationsController', function($scope) {
  $scope.initialValues = {

  };


  $scope.boost = '0000',
  $scope.cc = '0000',
  $scope.cylinders = '4',
  $scope.afr = '15',

  $scope.maxIQValue = 0;
  $scope.safeIQValue = 0;
  $scope.safeTorque = 0;

  var temperatureMass = [
      0, 1292,
      5, 1269,
      10, 1247,
      15, 1225,
      20, 1204,
      25, 1183,
      30, 1164,
      35, 1146
    ];

    //calculations of IQ with air density
    $scope.calculateMaxIQ10 = function() {
      $scope.maxIQValue = maxIQ(10);
    };
    $scope.calculateMaxIQ20 = function() {
      $scope.maxIQValue = maxIQ(20);
    };
    $scope.calculateMaxIQ30 = function() {
      $scope.maxIQValue = maxIQ(30);
    };
    $scope.calculateMaxIQ40 = function() {
      $scope.maxIQValue = maxIQ(40);
    };

    //calculations of IQ with air density - 20%
    $scope.calculateSafeIQ10 = function() {
      $scope.safeIQValue = safeIQ(10);
    };
    $scope.calculateSafeIQ20 = function() {
      $scope.safeIQValue = safeIQ(20);
    };
    $scope.calculateSafeIQ30 = function() {
      $scope.safeIQValue = safeIQ(30);
    };
    $scope.calculateSafeIQ40 = function() {
      $scope.safeIQValue = safeIQ(40);
    };

  function maxIQ(temperature) {
    var cylinderCapacity = ($scope.cc / $scope.cylinders);
    var totalMassAndBoost = ($scope.boost + 1000)*getMass(temperature);
    return (totalMassAndBoost*cylinderCapacity)/$scope.afr;
  };

  function safeIQ(temperature) {
    var cylinderCapacity = ($scope.cc / $scope.cylinders);
    var totalMassAndBoost = ($scope.boost + 1000)*getMass(temperature);

    var totalIQ = (totalMassAndBoost*cylinderCapacity)/$scope.afr;

    return totalIQ - (totalIQ*0.2);
  };


    $scope.torqueCalculation = function() {
      $scope.safeTorque = $scope.safeIQValue*1.5*$scope.cylinders;
    };

  function getMass(temperature) {
    console.log("temperature: " + temperature);
    for(var i = 0; i < temperatureMass.length; i++) {
      if(temperatureMass[i] == temperature) {
        console.log("density: " + temperatureMass[i+1]);
        return temperatureMass[i+1];
      }
    }
  }
});
