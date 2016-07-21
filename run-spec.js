const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadCofigFile('spec/support/jasmine.json');
jasmine.execute();
