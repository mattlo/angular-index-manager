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
		
	it('validate setters', function () {
		var im = new IndexManager;
		
		im.setMaxIndex(10);
		im.setIndex(2);
		
		expect(im.getMaxIndex()).toBe(10);
		expect(im.getIndex()).toBe(2);
		
		im.setIndex(10);
		
		expect(im.getIndex()).toBe(10);
	});
	
	it('validate index range', function () {
		var im = new IndexManager;
		
		im.setMaxIndex(10);
		
		expect(function () {
			try {
				im.setIndex(11);
				return false;
			} catch (e) {
				return e instanceof RangeError;
			}
		}()).toBe(true);
	});
	
	it('validate next/back', function () {
		var im = new IndexManager;
		
		im.setMaxIndex(10);
		
		im.next();
		expect(im.getIndex()).toBe(1);
		
		im.setIndex(9);
		im.next();
		expect(im.getIndex()).toBe(10);
		
		im.back();
		expect(im.getIndex()).toBe(9);
		
		im.setIndex(1);
		im.back();
		expect(im.getIndex()).toBe(0);
		
		// validate that it does nothing if its on 0
		im.back();
		expect(im.getIndex()).toBe(0);
	});
	
	it('validate next/back infinite', function () {
		var im = new IndexManager;
		
		im.setMaxIndex(10).setIsInfinite(true);
		
		im.next();
		expect(im.getIndex()).toBe(1);
		
		im.setIndex(9);
		im.next();
		expect(im.getIndex()).toBe(10);		
		
		im.next();
		expect(im.getIndex()).toBe(0);
		
		im.back();
		expect(im.getIndex()).toBe(10);
		
		im.setIndex(1);
		im.back();
		expect(im.getIndex()).toBe(0);
		
		im.back();
		expect(im.getIndex()).toBe(10);
	});
	
	
});