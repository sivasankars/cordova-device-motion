angular.module('app.controllers', [])

.controller('MotionCtrl', function($ionicPlatform, $scope, $timeout, $cordovaDeviceMotion) {
    $ionicPlatform.ready(function() {
        // Values @ this instance
        $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
            $scope.X = result.x;
            $scope.Y = result.y;
            $scope.Z = result.z;
            $scope.timeStamp = result.timestamp;
        }, function(err) {
            // An error occurred. Show a message to the user
            console.log(err);
        });
        // Keep watching for change in values
        // watch Acceleration
        var options = {
            frequency: 2000
        };
        $scope.watch = $cordovaDeviceMotion.watchAcceleration(options);
        $scope.watch.then(
            null,
            function(error) {
                // An error occurred
            },
            function(result) {
                $scope.X = result.x;
                $scope.Y = result.y;
                $scope.Z = result.z;
                $scope.timeStamp = result.timestamp;
            });
		/*
        $timeout(function() {
            $scope.watch.clearWatch();
            // or
            // $cordovaDeviceMotion.clearWatch(watch)
            // .then(function(result) {
            //   // success
            //   }, function (error) {
            //   // error
            // });
        }, 10000);
		*/
    });
})