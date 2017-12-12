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

app.controller('MainCtrl', ['$scope', 'categoriasList', 'subCategoriasList', 'marcasList', 'totalVisitCount', '$firebaseStorage', '$window', '$location', 'orderByFilter',
    function($scope, categoriasList, subCategoriasList, marcasList, totalVisitCount, $firebaseStorage, $window, $location, orderByFilter) {

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
        $scope.eventosList = {};
        $scope.bolosList = {};
        $scope.fotografiaList = {};
        $scope.festaList = {};

        $scope.totalVisitCount = {};
        $scope.totalCounter = 0;
        
        $scope.marca = {};
        $scope.marca.counter = 0;
        $scope.totalCount = 0;

        var contJoias = 0;
        var contBebe = 0;
        var contVestuario = 0;
        var contAnimais = 0;
        var contIdeias = 0;
        var contTipicamente = 0;
        var contArtesanato = 0;
        var contDecoracao = 0;
        var contEventos = 0;
        var contBolos = 0;
        var contFotografia = 0;
        var contFesta = 0;

        var fromDestaque1;
        var fromDestaque2;
        var fromDestaque3;
        var fromDestaque4;

        var counterrr = 0;

        var sortedJoiasList = [];
        var joiasList = [];
        var sortedBebeList = [];
        var sortedVestuarioList = [];
        var sortedAnimaisList = [];
        var sortedIdeiasList = [];
        var sortedTipicamenteList = [];
        var sortedArtesanatoList = [];
        var sortedDecoracaoList = [];
        var sortedEventosList = [];
        var sortedBolosList = [];
        var sortedFotografiaList = [];
        var sortedFestaList = [];

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
            $scope.totalCount = $scope.totalVisitCount.length;
            counterrr = $scope.totalVisitCount.length;
            angular.element('#counterrr').html(counterrr);
        });

        
        marcasList.$loaded().then(function() {  
            $scope.marcasList = marcasList;
            for (var i = 0; i < $scope.marcasList.length; i++) {
                //if($scope.marcasList[i].marca.subCategoria != null && $scope.marcasList[i].marca.publish) {
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
                    if($scope.marcasList[i].marca.subCategoria === "Empresas de Organização de Eventos") {
                        $scope.eventosList[contEventos] = $scope.marcasList[i];
                        contEventos++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Bolos e Pastelaria") {
                        $scope.bolosList[contBolos] = $scope.marcasList[i];
                        contBolos++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Serviço de Fotografia e Vídeo") {
                        $scope.fotografiaList[contFotografia] = $scope.marcasList[i];
                        contFotografia++;
                    }
                    if($scope.marcasList[i].marca.subCategoria === "Sempre em Festa (casamentos, batizados e muitos artigos)") {
                        $scope.festaList[contFesta] = $scope.marcasList[i];
                        contFesta++;
                    }        
                }
            }

            $scope.sorting = "newOrder";

            for (var x in $scope.joiasList){
                $scope.joiasList[x].newOrder = $scope.randomSort();
                $scope.joiasList.hasOwnProperty(x) && sortedJoiasList.push($scope.joiasList[x])
            }
            $scope.sortedJoiasList = sortedJoiasList;

            for (var x in $scope.bebeList){
                $scope.bebeList[x].newOrder = $scope.randomSort();
                $scope.bebeList.hasOwnProperty(x) && sortedBebeList.push($scope.bebeList[x])
            }
            $scope.sortedbebeList = sortedBebeList;

            for (var x in $scope.vestuarioList){
                $scope.vestuarioList[x].newOrder = $scope.randomSort();
                $scope.vestuarioList.hasOwnProperty(x) && sortedVestuarioList.push($scope.vestuarioList[x])
            }
            $scope.sortedvestuarioList = sortedVestuarioList;

            for (var x in $scope.animaisList){
                $scope.animaisList[x].newOrder = $scope.randomSort();
                $scope.animaisList.hasOwnProperty(x) && sortedAnimaisList.push($scope.animaisList[x])
            }
            $scope.sortedanimaisList = sortedAnimaisList;

            for (var x in $scope.ideiasList){
                $scope.ideiasList[x].newOrder = $scope.randomSort();
                $scope.ideiasList.hasOwnProperty(x) && sortedIdeiasList.push($scope.ideiasList[x])
            }
            $scope.sortedideiasList = sortedIdeiasList;

            for (var x in $scope.tipicamenteList){
                $scope.tipicamenteList[x].newOrder = $scope.randomSort();
                $scope.tipicamenteList.hasOwnProperty(x) && sortedTipicamenteList.push($scope.tipicamenteList[x])
            }
            $scope.sortedtipicamenteList = sortedTipicamenteList;

            for (var x in $scope.artesanatoList){
                $scope.artesanatoList[x].newOrder = $scope.randomSort();
                $scope.artesanatoList.hasOwnProperty(x) && sortedArtesanatoList.push($scope.artesanatoList[x])
            }
            $scope.sortedartesanatoList = sortedArtesanatoList;

            for (var x in $scope.decoracaoList){
                $scope.decoracaoList[x].newOrder = $scope.randomSort();
                $scope.decoracaoList.hasOwnProperty(x) && sortedDecoracaoList.push($scope.decoracaoList[x])
            }
            $scope.sorteddecoracaoList = sortedDecoracaoList;

            for (var x in $scope.eventosList){
                $scope.eventosList[x].newOrder = $scope.randomSort();
                $scope.eventosList.hasOwnProperty(x) && sortedEventosList.push($scope.eventosList[x])
            }
            $scope.sortedeventosList = sortedEventosList;

            for (var x in $scope.bolosList){
                $scope.bolosList[x].newOrder = $scope.randomSort();
                $scope.bolosList.hasOwnProperty(x) && sortedBolosList.push($scope.bolosList[x])
            }
            $scope.sortedbolosList = sortedBolosList;

            for (var x in $scope.fotografiaList){
                $scope.fotografiaList[x].newOrder = $scope.randomSort();
                $scope.fotografiaList.hasOwnProperty(x) && sortedFotografiaList.push($scope.fotografiaList[x])
            }
            $scope.sortedfotografiaList = sortedFotografiaList;

            for (var x in $scope.festaList){
                $scope.festaList[x].newOrder = $scope.randomSort();
                $scope.festaList.hasOwnProperty(x) && sortedFestaList.push($scope.festaList[x])
            }
            $scope.sortedfestaList = sortedFestaList;

            $scope.getDestaque1();
            $scope.getDestaque2();
            $scope.getDestaque3();
            $scope.getDestaque4();
        });
            
        $scope.randomSort = function() {
            return Math.random();
        };

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

            if ($scope.marca.counter == null) {
                $scope.marca.counter = 1;
            } else {
                $scope.marca.counter++;
            }   
            
            $scope.marcasList.$save(postIdx).then(function() {
                //$scope.getFirstPostDetails(postKey); 
                console.log ($scope.marca) 
            });
        };

        $scope.getDestaque1 = function() {
            var record = $scope.marcasList.$getRecord("-KzxNFNOlUpNH5X-USfm");
            $scope.destaque1 = record.marca;
            fromDestaque1 = true;
        }
        $scope.getDestaque2 = function() {
            var record = $scope.marcasList.$getRecord("-KyYRTAqW2Jkq0p9AvG8");
            $scope.destaque2 = record.marca;
            fromDestaque2 = true;
        }
        $scope.getDestaque3 = function() {
            var record = $scope.marcasList.$getRecord("-KzIWjetlF1RSiKfd0hs");
            $scope.destaque3 = record.marca;
            fromDestaque3 = true;
        }
        $scope.getDestaque4 = function() {
            var record = $scope.marcasList.$getRecord("-KzkawX0mzn1CISGzSSp");
            $scope.destaque4 = record.marca;
            fromDestaque4 = true;
        }

        $scope.atras = function(param) {
            if (param == "1") {
                //$window.location.assign('marcas/bebe-e-crianca');
                $location.url('/marcas/bebe-e-crianca');
            } else {
                $scope.isMarcaList = true;
                $scope.isMarcaDetails = false;
            }
            if (param == "2") {
                //$window.location.assign('marcas/bebe-e-crianca');
                $location.url('/eventos/empresas-de-organizaçao-de-eventos');
            } else {
                $scope.isMarcaList = true;
                $scope.isMarcaDetails = false;
            }
            if (param == "3") {
                //$window.location.assign('marcas/bebe-e-crianca');
                $location.url('/marcas/tipicamente-portugues');
            } else {
                $scope.isMarcaList = true;
                $scope.isMarcaDetails = false;
            }
            if (param == "4") {
                //$window.location.assign('marcas/bebe-e-crianca');
                $location.url('/marcas/joias-acessorios-malas');
            } else {
                $scope.isMarcaList = true;
                $scope.isMarcaDetails = false;
            }
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