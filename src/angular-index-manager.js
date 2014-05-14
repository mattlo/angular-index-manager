(function () {
	angular.module('index-manager', ['ng']).factory('IndexManager', function () {
		
		/**
		 * @constructor
		 */
		function IndexManager () {
			// default properties
			this.index = 0; // default is on 0
			this.lastIndex = 0;
			this.maxIndex = 0;
			this.isInfinite = false;
			this.onIndexChange = function () {}; // callback fired
		}
		
		IndexManager.prototype = {
			/**
			 * @enum
			 */
			Direction: {
				Left: 0,
				Right: 1
			},
			/**
			 * Proceeds to next index value going forward, invokes `setIndex`
			 * Does nothing if conditions aren't met
			 * @return {Boolean}
			 */
			next: function () {
				if (this.index < this.maxIndex) {
					this.setIndex(this.index + 1, this.Direction.Right);
				} else if (this.isInfinite === true) {
					this.setIndex(0, this.Direction.Right);
				} else {
					return false;
				}
			},
			/**
			 * Proceeds to next index value going backwards, invokes `setIndex`
			 * Does nothing if conditions aren't met
			 * @return {Boolean}
			 */
			back: function () {
				if (this.index > 0) {
					this.setIndex(this.index - 1, this.Direction.Left);
				} else if (this.isInfinite === true) {
					this.setIndex(this.maxIndex, this.Direction.Left);
				} else {
					return false;
				}
			},
			/**
			 * Sets index, defines previous index, invokes `action`
			 * @param {number} index
			 * @param {IndexManager.Direction} direction
			 */
			setIndex: function (index, direction) {
				// set a last index for point of references in `action`
				this.lastIndex = this.index;
				// defined new index
				this.index = index;
				// invoke action which may have animation
				this.action(direction || null);
				// fire onIndexChange event
				this.onIndexChange(index, this.lastIndex);
			},
			/**
			 * Return current index
			 * @return {number}
			 */
			getIndex: function () {
				return this.index;
			},
			/**
			 * Stub, overridable method
			 * @return {undefined}
			 */
			action: function () {},
			/**
			 * Set max index
			 * @param {number} number
			 * @return {undefined}
			 */
			setMaxIndex: function (number) {
				this.maxIndex = number;
			},
			/**
			 * Set max index
			 * @param {number} number
			 * @return {undefined}
			 */
			getMaxIndex: function (number) {
				return this.maxIndex;
			},
			/**
			 * Set event for on index change
			 * @param {Function} event
			 * @return {undefined}
			 */
			setOnIndexChange: function (event) {
				this.onIndexChange = event;
			}
		};
		
		return IndexManager;
	});
}());