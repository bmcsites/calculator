let app = angular.module('myapp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/myhome');

    $stateProvider
        .state('myhome', {
            url: '/myhome',
            template: '<myhome></myhome>'
        })
        .state('cal', {
            url: '/calculator',
            template: '<calculator></calculator>'
        })
});

app.controller('mainctrl', function() {

});
