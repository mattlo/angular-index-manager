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
			 * @param {Number} index
			 * @param {IndexManager.Direction} direction
			 * @return {IndexManager}
			 */
			setIndex: function (index, direction) {
				if (index > this.maxIndex) {
					throw new RangeError('index provided cannot be larger than the max index');
				}
				
				// set a last index for point of references in `action`
				this.lastIndex = this.index;
				// defined new index
				this.index = index;
				// invoke action which may have animation
				this.action(direction || null);
				// fire onIndexChange event
				this.onIndexChange(index, this.lastIndex);
				
				return this;
			},
			/**
			 * Return current index
			 * @return {Number}
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
			 * @return {IndexManager}
			 */
			setMaxIndex: function (number) {
				this.maxIndex = number;
				
				return this;
			},
			/**
			 * Set max index
			 * @param {number} number
			 * @return {Number}
			 */
			getMaxIndex: function (number) {
				return this.maxIndex;
			},
			/**
			 * Set event for on index change
			 * @param {Function} event
			 * @return {IndexManager}
			 */
			setOnIndexChange: function (event) {
				this.onIndexChange = event;
				
				return this;
			},
			/**
			 * @param {Boolean} isInfinite
			 * @return {IndexManager}
			 */
			setIsInfinite: function (isInfinite) {
				this.isInfinite = isInfinite;
				
				return this;
			}
		};
		
		return IndexManager;
	});
}());