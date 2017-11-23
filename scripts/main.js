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

app.controller('MainCtrl', ['$scope', 'categoriasList', 'subCategoriasList', 'marcasList', '$firebaseStorage', '$window',
    function($scope, categoriasList, subCategoriasList, marcasList, $firebaseStorage, $window) {

        var postKey;
        var postIdx;
        var locationHref;

        $scope.isList = true;
        $scope.isMarcaList = true;
        $scope.isDetails = false;
        $scope.categoriasList = {};
        $scope.subCategoriasList = {};
        $scope.marcasList = {};
        $scope.joiasList = {};
        $scope.marca = {};

        var contJoias = 0;

        marcasList.$loaded().then(function() {  
            $scope.marcasList = marcasList;
            for (var i = 0; i < $scope.marcasList.length; i++) {
                if($scope.marcasList[i].marca.subCategoria != null) {
                    if($scope.marcasList[i].marca.subCategoria === "Joias, Acessórios e Malas") {
                        $scope.joiasList[contJoias] = $scope.marcasList[i];
                        contJoias++;
                    }
                }
            }
        });

        $scope.getDetails = function(param) {
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

       
    }
]);