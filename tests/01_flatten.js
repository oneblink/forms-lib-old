define([
  'intern!tdd',
  'chai',
  'forms'
], function (tdd, chai, Forms) {
  'use strict';
  var assert;
  assert = chai.assert;

  tdd.suite('Forms.flattenDefinition', function () {

    tdd.test('flattenDefinition is a function', function () {
      assert.isFunction(Forms.flattenDefinition);
    });

  });

  tdd.suite('flattening', function () {
    var def, flat;

    tdd.before(function () {
      def = {
        'default': {
          name: 'my-form',
          _elements: [
            {
              'default': {
                name: 'my-element'
              }
            }
          ]
        }
      };
      flat = Forms.flattenDefinition(def);
    });

    tdd.test('output is an Object', function () {
      assert.isObject(flat);
    });

    tdd.test('properties in default are flattened as expected', function () {
      assert.notProperty(flat, 'default');
      assert.isString(flat.name);
      assert.equal(flat.name, def['default'].name);
    });

    tdd.test('components in default are flattened as expected', function () {
      var el;
      assert.isArray(flat._elements);
      assert.lengthOf(flat._elements, 1);
      el = flat._elements[0];
      assert.notProperty(el, 'default');
      assert.isString(el.name);
      assert.equal(el.name, def['default']._elements[0]['default'].name);
    });

//    tdd.test('_elements listing in a variation is used as expected');

  });

  tdd.suite('flattening with variations', function () {
    var def, flat;

    tdd.before(function () {
      def = {
        'default': {
          name: 'my-form',
          _elements: [
            {
              'default': {
                name: 'element-1'
              },
              add: {
                label: 'Element 1'
              }
            },
            {
              'default': {
                name: 'element-2'
              },
              edit: {
                label: 'Element 2'
              }
            },
            {
              'default': {
                name: 'element-3'
              },
              list: {
                label: 'Element 3'
              }
            }
          ]
        },
        add: {
          label: 'My Form',
          _elements: [
            'element-2',
            'element-1'
          ]
        }
      };
      flat = Forms.flattenDefinition(def, 'add');
    });

    tdd.test('output is an Object', function () {
      assert.isObject(flat);
    });

    tdd.test('properties in default are flattened as expected', function () {
      assert.isString(flat.label);
      assert.equal(flat.label, def.add.label);
    });

    tdd.test('_elements listing in a variation controls order', function () {
      var original;
      assert.lengthOf(flat._elements, 2);
      original = def['default']._elements[1];
      assert.isString(flat._elements[0].name);
      assert.equal(flat._elements[0].name, original['default'].name);
      original = def['default']._elements[0];
      assert.isString(flat._elements[1].label);
      assert.equal(flat._elements[1].label, original.add.label);
    });

  });

});
