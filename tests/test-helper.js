import QUnit from 'qunit';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

Edgar.setupQUnitCleanup(QUnit); // Necessary b/c Edgar doesn't have access to QUnit directly
