describe('IndexManager Tests', function () {
	var IndexManager;

	// mock app
	beforeEach(angular.mock.module('index-manager'));

	// validate and get IndexManager factory
	beforeEach(angular.mock.inject(function ($injector) {
		IndexManager = $injector.get('IndexManager');
	}));
	
	it('can be instantiated', function () {
		expect(function () {
			try {
				// will throw an error if IndexManager is not a function
				return (new IndexManager) instanceof IndexManager;
			} catch (e) {
				return false;
			}
		}()).toBe(true);
	});

	it('direction enums', function () {
		var im = new IndexManager;
		
		expect(typeof im.Direction !== undefined).toBe(true);
		expect(typeof im.Direction.Left === 'number').toBe(true);
		expect(typeof im.Direction.Right === 'number').toBe(true);
	});

});