'use strict';

/**
 * @ngdoc overview
 * @name DePortugalcomAmorApp
 * @description
 * # DePortugalcomAmorApp
 *
 * Main module of the application.
 */

var config = {
    apiKey: "AIzaSyBZWa0zZlea12cOZALXI_mKr94gNcb9gZQ",
    authDomain: "deportugalcomamor-18899.firebaseapp.com",
    databaseURL: "https://deportugalcomamor-18899.firebaseio.com",
    projectId: "deportugalcomamor-18899",
    storageBucket: "deportugalcomamor-18899.appspot.com",
    messagingSenderId: "1079610494899"
};
firebase.initializeApp(config);

var app = angular.module('DePortugalcomAmorApp', [
	'ngAnimate',
	'ngAria',
	'ngCookies',
	'ngMessages',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'firebase',
	'datatables',
	'ksSwiper'
]);

app.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });
}]);

app.config(function ($routeProvider, $locationProvider, $compileProvider) {
    $routeProvider
      	.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
        })
        .when('/quemsomos', {
			templateUrl: 'views/quemsomos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
        })
        .when('/faleconnosco', {
			templateUrl: 'views/faleconnosco.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
        .when('/marcas', {
			templateUrl: 'views/submarcas.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
        })
        .when('/eventos', {
			templateUrl: 'views/subeventos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
        })
        .when('/turismo', {
			templateUrl: 'views/subturismo.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
        })
        .when('/marcas/joias-acessorios-malas', {
			templateUrl: 'views/joias-acessorios-malas.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.hashPrefix('');

    $locationProvider.html5Mode(true);

    $compileProvider.preAssignBindingsEnabled(true);
});
