var chipping = angular.module("chipping", []).controller('calculationsController', function($scope) {
  $scope.initialValues = {

  };


  $scope.boost = '';
  $scope.cc = '';
  $scope.cylinders = '';
  $scope.afr = '18';
  $scope.injectorVolume = '';

  $scope.maxIQValue = 0;
  $scope.safeIQValue = 0;
  $scope.safeTorque = 0;
  $scope.maxTorque = 0;
  $scope.estimatedPower = 0;
  $scope.injectorLimit = 0;

  $scope.calculate = function() {
    $scope.maxIQ();
    $scope.safeIQ();
    $scope.maxTorqueCalculation();
    $scope.safeTorqueCalculation();
    $scope.powerCalculation();
    $scope.injectorLimitCalculation();
  };

  $scope.maxIQ = function() {
    var cylinderCapacity = ($scope.cc / $scope.cylinders);
    var totalMassAndBoost = ((parseInt($scope.boost) + 1000)/1000);
    $scope.maxIQValue =  (totalMassAndBoost*cylinderCapacity)/$scope.afr;
  };

  $scope.safeIQ = function() {
    var cylinderCapacity = ($scope.cc / $scope.cylinders);
    var totalMassAndBoost = ((parseInt($scope.boost) + 1000)/1000);
    var totalIQ =  (totalMassAndBoost*cylinderCapacity)/$scope.afr;
    $scope.safeIQValue = totalIQ - (totalIQ*0.2);
  };


  $scope.maxTorqueCalculation = function() {
    $scope.maxTorque = ($scope.maxIQValue*6*$scope.cylinders)/(4*0.9);
  };
  $scope.safeTorqueCalculation = function() {
    $scope.safeTorque = ($scope.safeIQValue*6*$scope.cylinders)/(4*0.9);
  };

  $scope.powerCalculation = function() {
    $scope.estimatedPower = parseInt(parseInt($scope.safeTorque*parseInt(4000))/parseInt(7121)) + " ~ " +
                            parseInt(parseInt($scope.maxTorque*parseInt(4000))/parseInt(7121)) + " BHP";
  };

  $scope.injectorLimitCalculation = function() {
    var lbsh = $scope.injectorVolume/10.5;
    var gs = lbsh*0.125997881;
    var gmin = gs*60;
    $scope.injectorLimit = (gmin*1000)/4000;
  };
});
