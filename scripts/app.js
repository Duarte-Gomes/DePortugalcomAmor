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
		.when('/gastronomia', {
			templateUrl: 'views/subgastronomia.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		
        .when('/marcas/joias-acessorios-malas', {
			templateUrl: 'views/joias-acessorios-malas.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/marcas/bebe-e-crianca', {
			templateUrl: 'views/bebe-e-crianca.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/marcas/vestuario-e-calcado', {
			templateUrl: 'views/vestuario-e-calcado.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/marcas/animais', {
			templateUrl: 'views/animais.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/marcas/ideias-unicas', {
			templateUrl: 'views/ideias-unicas.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/marcas/tipicamente-portugues', {
			templateUrl: 'views/tipicamente-portugues.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/marcas/artesanato', {
			templateUrl: 'views/artesanato.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/marcas/decoracao', {
			templateUrl: 'views/decoracao.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})

		.when('/eventos/empresas-de-organizaçao-de-eventos', {
			templateUrl: 'views/organizacao-eventos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/eventos/bolos-e-pastelaria', {
			templateUrl: 'views/bolos-pastelaria.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/eventos/servico-de-fotografia-e-video', {
			templateUrl: 'views/fotografia-video.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})

		.when('/gastronomia/chocolates-e-doces', {
			templateUrl: 'views/chocolate-doces.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/pates-e-conservas', {
			templateUrl: 'views/pates-conservas.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/vinhos-e-licores', {
			templateUrl: 'views/vinhos-licores.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/aperitivos', {
			templateUrl: 'views/aperitivos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/queijos-e-enchidos', {
			templateUrl: 'views/queijos-enchidos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/chas-e-infusoes', {
			templateUrl: 'views/chas-infusoes.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/especiarias-e-temperos', {
			templateUrl: 'views/especiarias-temperos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})

		.when('/gastronomia/chocolates-e-doces', {
			templateUrl: 'views/chocolates-doces.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/pates-e-conservas', {
			templateUrl: 'views/pates-conservas.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/vinhos-e-licores', {
			templateUrl: 'views/vinhos-licores.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/aperitivos', {
			templateUrl: 'views/aperitivos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/queijos-e-enchidos', {
			templateUrl: 'views/queijos-enchidos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/chas-e-infusoes', {
			templateUrl: 'views/chas-infusoes.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/gastronomia/especiarias-e-temperos', {
			templateUrl: 'views/especiarias-temperos.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		
		.when('/destaque-1', {
			templateUrl: 'views/destaque-1.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/destaque-2', {
			templateUrl: 'views/destaque-2.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/destaque-3', {
			templateUrl: 'views/destaque-3.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/destaque-4', {
			templateUrl: 'views/destaque-4.html',
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
