/*jshint esversion: 6, node: true*/
'use strict';

const Index = require('../index');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

function testSolution(input) {

    const result = [];

    Index.init(function (ans) {

            result.push(ans);

            if (arguments.length > 1) {
                throw 'print should be called only with one argument!';
            }
        },
        () => input.shift());
    Index.solution();

    return result;
}

describe('Solution', function () {

    describe.skip('program', function () {

        [
            {
                input: ['6 6'],
                result: [7]
            }, {
                input: ['6 4'],
                result: ['5', '6', '7']
            }, {
                input: ['12 20'],
                result: [
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21'
                ]
            }
        ].forEach((testCase) => {

            it('should solve for ' + testCase.input, function () {

                // Arrange
                const input = testCase.input;

                // Act
                const result = testSolution(input);

                // Assert
                assert.deepEqual(result, testCase.result);
            });

        })
    });

    describe('Data files tests', function () {

        if (!fs.existsSync('datafiles')) {
            return console.log('no data files available');
        }

        fs.readdirSync('datafiles')
            .filter((file) => file.endsWith('.in'))
            .map((file) => {

                const id = file.replace(path.extname(file), '');

                return {
                    input: 'datafiles/' + file,
                    result: 'datafiles/' + id + '.ans'
                }

            })
            .forEach((testCase) => {

                it(`should solve it for ${testCase.input} file`, () => {

                    // Arrange
                    const input = fs.readFileSync(testCase.input, 'UTF8').split('\n');
                    const output = fs.readFileSync(testCase.result, 'UTF8').split('\n');
                    output.pop();

                    // Act
                    const result = testSolution(input);

                    // Assert
                    assert.deepEqual(result, output);
                });
            });

    });
});
