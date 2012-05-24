/*global node,require,describe,it,expect,spyOn*/

var jessie = require('../../libs/jessie/jessie.js').jessie;
var path = require('path');
var fixturePath = 'specs/jessie/fixtures';

var MockRendition = function() {

};
MockRendition.prototype.getContents = function() {

};

describe("jessie.Function", function() {
	describe("Creating a new instance", function() {
		describe("No folder argument", function() {
			it("Throws an error", function() {
				expect(function() {
					new jessie.Function('');
				}).toThrow();
			});
		});
		describe("Valid folder", function() {

			it("Stores the folder name as the name property", function() {
				var fn = new jessie.Function(fixturePath + '/functionFolder', MockRendition);
				expect(fn.name).toBe('functionFolder');
			});

			it("Stores the renditions found within the function folder", function() {
				var fn = new jessie.Function(fixturePath + '/functionFolder', MockRendition);
				expect(fn.renditions.length).toBe(2);
				expect(fn.renditions[0] instanceof MockRendition).toBe(true);
				expect(fn.renditions[1] instanceof MockRendition).toBe(true);
			});
		});
	});

	describe("Getting the rendition dependencies", function() {

	});

	describe("Getting rendition file contents", function() {
		it("Calls getDependencies on the rendition object", function() {
			var fn = new jessie.Function(fixturePath + '/functionFolder', MockRendition);
			spyOn(fn.renditions[0], 'getContents');
			fn.getContentsForRendition(1);
			expect(fn.renditions[0].getContents).toHaveBeenCalled();
		});
	});

});