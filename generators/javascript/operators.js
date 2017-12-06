/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.JavaScript.operators');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['operator_arith'] = function(block, operator, order) {
  var argument1 = Blockly.JavaScript.valueToCode(block, 'NUM1', order) || 0;
  var argument2 = Blockly.JavaScript.valueToCode(block, 'NUM2', order) || 0;
  if(argument1 == "NaN") argument1='0'; 
  if(argument2 == "NaN") argument2='0';
  var code = argument1 + operator + argument2;
  return [code, order];
};
Blockly.JavaScript['operator_comp'] = function(block, operator, order) {
  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order) || 0;
  var argument2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order) || 0;
  if(argument1 == "NaN") argument1='0'; 
  if(argument2 == "NaN") argument2='0';
  var code = argument1 + operator + argument2;
  return [code, order];
};
Blockly.JavaScript['operator_add'] = function(block) {
  return Blockly.JavaScript['operator_arith'](block, '+', Blockly.JavaScript.ORDER_ADDITION);  
};

Blockly.JavaScript['operator_subtract'] = function(block) {
  return Blockly.JavaScript['operator_arith'](block, '-', Blockly.JavaScript.ORDER_SUBTRACTION);  
};

Blockly.JavaScript['operator_multiply'] = function(block) {
  return Blockly.JavaScript['operator_arith'](block, '*', Blockly.JavaScript.ORDER_MULTIPLICATION);  
};

Blockly.JavaScript['operator_divide'] = function(block) {
  return Blockly.JavaScript['operator_arith'](block, '/', Blockly.JavaScript.ORDER_DIVISION);  
};

Blockly.JavaScript['operator_random'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_COMMA) || '0';
  var functionName = Blockly.JavaScript.provideFunction_(
      'mathRandomInt',
      ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
          '(a, b) {',
       '  if (a > b) {',
       '    // Swap a and b to ensure a is smaller.',
       '    var c = a;',
       '    a = b;',
       '    b = c;',
       '  }',
       '  return Math.floor(Math.random() * (b - a + 1) + a);',
       '}']);
  var code = functionName + '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/*Blockly.JavaScript['operator_logic'] = function(block, operator, order) {
  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order);
  var argument2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order);
  var code = argument1 + operator + argument2;
  return [code, order];
};*/

Blockly.JavaScript['operator_lt'] = function(block) {
  return Blockly.JavaScript['operator_comp'](block, '<', Blockly.JavaScript.ORDER_RELATIONAL);  
};
Blockly.JavaScript['operator_lte'] = function(block) {
  return Blockly.JavaScript['operator_comp'](block, '<=', Blockly.JavaScript.ORDER_RELATIONAL);  
};
Blockly.JavaScript['operator_gt'] = function(block) {
  return Blockly.JavaScript['operator_comp'](block, '>', Blockly.JavaScript.ORDER_RELATIONAL);  
};
Blockly.JavaScript['operator_gte'] = function(block) {
  return Blockly.JavaScript['operator_comp'](block, '>=', Blockly.JavaScript.ORDER_RELATIONAL);  
};
Blockly.JavaScript['operator_equals'] = function(block) {
  return Blockly.JavaScript['operator_comp'](block, '==', Blockly.JavaScript.ORDER_EQUALITY);  
};
Blockly.JavaScript['operator_neq'] = function(block) {
  return Blockly.JavaScript['operator_comp'](block, '!=', Blockly.JavaScript.ORDER_EQUALITY);  
};

Blockly.JavaScript['operator_and'] = function(block) {
  var order = Blockly.JavaScript.ORDER_LOGICAL_AND;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order) || false;
  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order) || false;
  var code = argument0 + ' && ' + argument1;
  return [code, order];
};
Blockly.JavaScript['operator_or'] = function(block) {
  var order = Blockly.JavaScript.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order) || false;
  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order) || false;
  var code = argument0 + ' || ' + argument1;
  return [code, order];
};

Blockly.JavaScript['operator_not'] = function(block) {
  // Negation.
  var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) || false;
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScript['operator_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
    var element0 = Blockly.JavaScript.valueToCode(block, 'STRING1',
        Blockly.JavaScript.ORDER_NONE) || '';
    var element1 = Blockly.JavaScript.valueToCode(block, 'STRING2',
        Blockly.JavaScript.ORDER_NONE) || '';
    var code = 'String(' + element0 + ') + String(' + element1 + ')';
    return [code, Blockly.JavaScript.ORDER_ADDITION];
};


