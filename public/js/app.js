angular.module('siscoca', [])
.controller('conversionController', ['$scope', function($scope){

  $scope.ascensionRecta = {}
  $scope.declinacion = {}
  $scope.longitud = {}
  $scope.latitud = {}
  $scope.procedure =false;
  $scope.converted = false;

  $scope.conversiones = {
	"tipos": [{
		"tipo": "ecuatorial-ecliptica",
		"texto": "Ecuatorial a Ecliptica"
	}, {
		"tipo": "ecliptica-ecuatorial",
		"texto": "Ecliptica a Ecuatorial"
	}]
}

$scope.mostrarProcedimiento = function(){
  $scope.procedure = !$scope.procedure;
}

$scope.convert = function(){
  $scope.converted = true
  switch ($scope.conversion.tipo) {
    case 'ecuatorial-ecliptica':
      convertirEcuatorialAEcliptica()
      break;
    default:

  }
}

var convertirEcuatorialAEcliptica = function(){
  with (Math){
    $scope.longitudCeleste =180/PI
    $scope.oblicuidadEliptica= 23.4333334/$scope.longitudCeleste
    $scope.ascensionRecta.total=$scope.ascensionRecta.horas+$scope.ascensionRecta.minutos/60+$scope.ascensionRecta.segundos/3600
    $scope.declinacion.total=$scope.declinacion.grados+$scope.declinacion.minutos/60+$scope.declinacion.segundos/3600
    $scope.ascensionRecta.total = $scope.ascensionRecta.total * 15
    var longitud = atan(tan($scope.ascensionRecta.total/$scope.longitudCeleste)*cos($scope.oblicuidadEliptica)+tan($scope.declinacion.total/$scope.longitudCeleste)*sin($scope.oblicuidadEliptica)/cos($scope.ascensionRecta.total / $scope.longitudCeleste))
    if (longitud < 0) {
            longitud = longitud + 2 *PI
            }
    longitud = longitud * $scope.longitudCeleste
    DT = longitud - $scope.ascensionRecta.total
    if (DT < -90)  {
            longitud = longitud + 180
            }
    if (DT > 90) {
             longitud = longitud + 180
            }
    if (longitud > 360) {
            longitud = longitud - 360
            }
    var latitud=asin(sin($scope.declinacion.total/$scope.longitudCeleste)*cos($scope.oblicuidadEliptica)-cos($scope.declinacion.total/$scope.longitudCeleste)*sin($scope.oblicuidadEliptica)*sin($scope.ascensionRecta.total/$scope.longitudCeleste))
    $scope.longitud.grados=floor(longitud);
    $scope.longitud.minutos=floor((longitud - floor(longitud)) * 60)
    $scope.longitud.segundos=((longitud -floor(longitud)) * 60 - $scope.longitud.minutos) * 60
    latitud=latitud*$scope.longitudCeleste;
    D = abs(latitud);
    if (latitud>0) {
            $scope.latitud.grados=floor(D)
            } else {
            $scope.latitud.grados=(-1)*floor(D)
            }
    $scope.latitud.minutos=floor((D - floor(D)) * 60)
    $scope.latitud.segundos = ((D - floor(D)) * 60 - $scope.latitud.minutos) * 60
    if (latitud<0) {
            $scope.latitud.minutos=-$scope.latitud.minutos;
            $scope.latitud.segundos=-$scope.latitud.segundos;
            }

  }
  $scope.longitud.total = longitud;
  $scope.latitud.total = latitud;
}


}]);
