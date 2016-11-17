
import angular from 'angular';
import components from './components';
// import angularMaterial from 'angular-material';
// import 'angular-material/angular-material.css';

// const module = angular.module(`myApp`, [components, angularMaterial]);
const module = angular.module('myApp', [components]);

// module.config(['$mdThemingProvider', function($mdThemingProvider ){
//   $mdThemingProvider.theme('default')
//     .primaryPalette('indigo')
//     .backgroundPalette('deep-purple')
//     .warnPalette('red');
// }]);

export default module.name;