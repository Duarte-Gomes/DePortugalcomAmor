app.directive('fileModel',['$parse', function ($parse){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('change', function () {
                $parse(attrs.fileModel)
                .assign(scope, element[0].files[0])
                scope.$apply();
            })
        }
    }
}]);

app.controller('MainCtrl', ['$scope', 'categoriasList', 'subCategoriasList', 'marcasList', 'totalVisitCount', '$firebaseStorage', '$window',
    function($scope, categoriasList, subCategoriasList, marcasList, totalVisitCount, $firebaseStorage, $window) {

        var postKey;
        var postKeyCount;
        
        var postIdx;
        var locationHref;

        $scope.isList = true;
        $scope.isMarcaList = true;
        $scope.isDetails = false;

        $scope.categoriasList = {};
        $scope.subCategoriasList = {};
        $scope.marcasList = {};

        $scope.joiasList = {};
        $scope.bebeList = {};
        $scope.vestuarioList = {};
        $scope.animaisList = {};
        $scope.ideiasList = {};
        $scope.tipicamenteList = {};
        $scope.artesanatoList = {};
        $scope.decoracaoList = {};

        $scope.totalVisitCount = {};
        $scope.totalCounter = 0;

        $scope.marca = {};

        var contJoias = 0;
        var contBebe = 0;
        var contVestuario = 0;
        var contAnimais = 0;
        var contIdeias = 0;
        var contTipicamente = 0;
        var contArtesanato = 0;
        var contDecoracao = 0;

        totalVisitCount.$loaded().then(function() {
            $scope.totalVisitCount = totalVisitCount;

            if ($scope.totalVisitCount.length === 0) {

                $scope.totalCounter = 1;

                $scope.totalVisitCount.$add({
                    totalCounter: $scope.totalCounter,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(function() {
                    var temp = $scope.totalVisitCount.$keyAt(0);
                    var record = $scope.totalVisitCount.$getRecord(temp); 
                });      
            } else {

                $scope.totalCounter = $scope.totalVisitCount.length + 1;

                $scope.totalVisitCount.$add({
                    totalCounter: $scope.totalCounter,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(function() {
                    var temp = $scope.totalVisitCount.$keyAt($scope.totalVisitCount.length);
                    var record = $scope.totalVisitCount.$getRecord(temp);
                });         
            }
        });

        marcasList.$loaded().then(function() {  
            $scope.marcasList = marcasList;
            for (var i = 0; i < $scope.marcasList.length; i++) {
                if($scope.marcasList[i].marca.subCategoria != null) {
                    if($scope.marcasList[i].marca.subCategoria === "Joias, Acessórios e Malas") {
                        $scope.joiasList[contJoias] = $scope.marcasList[i];
                        contJoias++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Bebé e Criança") {
                        $scope.bebeList[contBebe] = $scope.marcasList[i];
                        contBebe++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Vestuário e Calçado") {
                        $scope.vestuarioList[contVestuario] = $scope.marcasList[i];
                        contVestuario++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Animais") {
                        $scope.animaisList[contAnimais] = $scope.marcasList[i];
                        contAnimais++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Ideias Únicas") {
                        $scope.ideiasList[contIdeias] = $scope.marcasList[i];
                        contIdeias++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Tipicamente Português") {
                        $scope.tipicamenteList[contTipicamente] = $scope.marcasList[i];
                        contTipicamente++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Artesanato") {
                        $scope.artesanatoList[contArtesanato] = $scope.marcasList[i];
                        contArtesanato++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Decoração") {
                        $scope.decoracaoList[contDecoracao] = $scope.marcasList[i];
                        contDecoracao++;
                    }
                }
            }
        });

        $scope.getDetails = function(param) {
            angular.element("html, body").animate({ scrollTop: 0 }, "fast");
            $scope.isMarcaList = false;
            $scope.isMarcaDetails = true;
            $scope.getMarcaDetails(param);
            locationHref = window.location.href;
        };

        $scope.getMarcaDetails = function(param) {
            postKey = param;
            var record = $scope.marcasList.$getRecord(param);
            postIdx = $scope.marcasList.$indexFor(param);
            $scope.marca = record.marca;
        };

        $scope.atras = function() {
            $scope.isMarcaList = true;
            $scope.isMarcaDetails = false;
            /* if (locationHref != null) {
                $window.location.assign(locationHref);
            } else {
                $window.location.assign('/');
            } */
        }

        angular.element('.categorias-a').click(function() {
            angular.element("html, body").animate({ scrollTop: 0 }, "fast");
        })
    }
]);