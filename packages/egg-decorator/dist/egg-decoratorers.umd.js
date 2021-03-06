/**
 * egg-decoratorers v0.0.3
 * (c) 2020 duanguang
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('reflect-metadata')) :
  typeof define === 'function' && define.amd ? define(['exports', 'reflect-metadata'], factory) :
  (global = global || self, factory(global.eggDecoratorer = {}));
}(this, (function (exports) { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var VALIDATE_PROPERTY = 'validateProperty';
  var VALIDATE_PROPERTY_METADATA_KEY = Symbol('validateProperty');
  var BODY_METADATA_KEY = Symbol('Body');
  var REQUIRED_METADATA_KEY = Symbol('required');
  var ResponseModel = function ResponseModel() {
      classCallCheck(this, ResponseModel);

      this.message = '';
      this.success = false;
      this.data = null;
      this.code = '';
  };

  function validateProperty(options) {
      /* return Reflect.metadata(validatePropertyMetadataKey, { ...options }); */
      return function (target, key) {
          var old = Reflect.getMetadata(VALIDATE_PROPERTY_METADATA_KEY, target, VALIDATE_PROPERTY);
          if (!old) {
              old = [];
          }
          old.push(_extends({}, options, {
              key: key
          }));
          Reflect.defineMetadata(VALIDATE_PROPERTY_METADATA_KEY, old, target, VALIDATE_PROPERTY);
      };
  }

  function assignMetadata(args, paramtype, index, data) {
      return Object.assign(Object.assign({}, args), defineProperty({}, "" + paramtype, {
          index: index,
          data: data
      }));
  }

  var createBodyDecorator = function createBodyDecorator(paramtype) {
      return function (data) {
          return function (target, key, index) {
              var args = Reflect.getMetadata(BODY_METADATA_KEY, target.constructor, key) || {};
              var paramData = data ? data : undefined;
              Reflect.defineMetadata(BODY_METADATA_KEY, assignMetadata(args, paramtype, index, paramData), target.constructor, key);
          };
      };
  };
  function Body(property) {
      return createBodyDecorator(4)(property);
  }

  function required(target, propertyKey, parameterIndex) {
      var existingRequiredParameters = Reflect.getOwnMetadata(REQUIRED_METADATA_KEY, target, propertyKey) || [];
      existingRequiredParameters.push(parameterIndex);
      Reflect.defineMetadata(REQUIRED_METADATA_KEY, existingRequiredParameters, target, propertyKey);
  }

  function post(target, propertyName, descriptor) {
      var method = descriptor.value;
      descriptor.value = function () {
          var that = this;
          var ctx = that['ctx'];
          var app = that['app'];
          if (ctx && app) {
              var body = ctx.request.body;
              var postParameters = Reflect.getOwnMetadata(BODY_METADATA_KEY, target.constructor, propertyName);
              if (postParameters) {
                  var func = postParameters['4']['data'];
                  if (typeof func === 'function') {
                      var dto = new func();
                      var postInfoMeta = Reflect.getMetadata(VALIDATE_PROPERTY_METADATA_KEY, dto, VALIDATE_PROPERTY);
                      var validateObj = {};
                      if (postInfoMeta && Array.isArray(postInfoMeta)) {
                          postInfoMeta.map(function (item) {
                              validateObj[item.key] = {
                                  type: item.type,
                                  required: item.required
                              };
                          });
                      }
                      arguments[0] = body;
                      var responseModel = new ResponseModel();
                      var error = app.validator.validate(validateObj, body);
                      if (error) {
                          responseModel.code = '200';
                          responseModel.message = '参数错误1';
                          responseModel.success = false;
                          responseModel.data = error;
                          ctx.body = responseModel;
                          return;
                      }
                  }
              }
          }
          return method.apply(this, arguments);
      };
  }

  function validate(target, propertyName, descriptor) {
      var method = descriptor.value;
      descriptor.value = function () {
          var arguments$1 = arguments;

          var requiredParameters = Reflect.getOwnMetadata(REQUIRED_METADATA_KEY, target, propertyName);
          if (requiredParameters) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                  for (var _iterator = requiredParameters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var parameterIndex = _step.value;

                      if (parameterIndex >= arguments$1.length || arguments$1[parameterIndex] === undefined) {
                          throw new Error('Missing required argument.');
                      }
                  }
              } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
              } finally {
                  try {
                      if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                      }
                  } finally {
                      if (_didIteratorError) {
                          throw _iteratorError;
                      }
                  }
              }
          }
          return method.apply(this, arguments);
      };
  }

  exports.Body = Body;
  exports.post = post;
  exports.required = required;
  exports.validate = validate;
  exports.validateProperty = validateProperty;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
