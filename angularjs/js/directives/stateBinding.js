angular.module("todomvc").directive("modernAngularApp", [
  function () {
    return {
      restrict: "E",
      scope: {
        state: "=",
        onNotify: "&",
      },
      link: function (scope, element) {
        scope.$watch("state", function (newVal) {
          element[0].state = newVal;
        });

        element.on("notify", function (event) {
          const message = event.detail;
          scope.$apply(function () {
            scope.onNotify({ message: message });
          });
        });
      },
    };
  },
]);
