'use strict';

describe('Service: OpenSenseBoxes', function () {

  // load the service's module
  beforeEach(module('openSenseMapApp'));

  // instantiate service
  var OpenSenseBoxes;
  beforeEach(inject(function (_OpenSenseBoxes_) {
    OpenSenseBoxes = _OpenSenseBoxes_;
  }));

  it('should do something', function () {
    expect(!!OpenSenseBoxes).toBe(true);
  });

});
