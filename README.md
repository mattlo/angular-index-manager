# Angular Index Manager [![Build Status](https://api.travis-ci.org/mattlo/angular-index-manager.svg?branch=master)](https://travis-ci.org/mattlo/angular-index-manager)

Manages index control, written as an Angular factory so you don't have to keep rewriting one for your carousels, tabs, or 
anything that requires keeping track of a particular position on an UI object.

## Install

Clone the repository and include directly into your project. You can also use bower and install as a dependency:

```
bower install angular-index-manager
```

Add the dependency in your Angular's project dependency arguments:

```
var app = angular.module('MyApp', [
	'index-manager'
]);
```

Then use it like any other DI'd object:

```
mbt.ng.controller('MyCtrl', ['IndexManager', function (IndexManager) {
	var im = new IndexManager
}]);
```

## Example Usage

Below is a typical installation of the library, implemented inside an Angular Controller. This is just for implementation guidance, this would typically go inside a directive since more than likely you'll be manipulating the DOM (`className`, `style`, ...).

#### Basic Inheritance

**controllers/CarouselCtrl.js**

```
function Carousel (carouselNode) {
	this.maxIndex = 10;
	this.isInfinite = true;
	this.carouselNode = carouselNode;
}

Carousel.prototype = new IndexManager;

Carousel.prototype.action = function () {
	// implement your animation logic here
	// ... maybe something with `this.carouselNode`
	// determine position `this.getIndex()` 
};

$scope.carousel = new Carousel($element[0].querySelector('.belt'));
```

**partials/carousel.html**

```
<div ng-controller="MyCtrl">
<div>
	<div class="belt">...</div>
	<a ng-click="carousel.back()"></a>
	<a ng-click="carousel.next()"></a>
</div>
```

## License
View the [LICENSE](https://github.com/mattlo/angular-index-manager/blob/master/LICENSE) file.