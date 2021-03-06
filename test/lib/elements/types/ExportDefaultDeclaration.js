import {parseAndGetStatement} from '../../../utils';
import Token from '../../../../src/elements/Token';
import {expect} from 'chai';

describe('ExportDefaultDeclaration', () => {
    it('should return correct type', () => {
        expect(parseAndGetStatement('export default 1;').type).to.equal('ExportDefaultDeclaration');
    });

    it('should accept a number', () => {
        let statement = parseAndGetStatement('export default 1;');
        expect(statement.declaration.type).to.equal('NumericLiteral');
        expect(statement.declaration.value).to.equal(1);
    });

    it('should accept a variable ', () => {
        let statement = parseAndGetStatement('export default a;');
        expect(statement.declaration.type).to.equal('Identifier');
    });

    it('should accept an object', () => {
        let statement = parseAndGetStatement('export default {};');
        expect(statement.declaration.type).to.equal('ObjectExpression');
    });

    it('should accept a function expression', () => {
        let statement = parseAndGetStatement('export default function() {};');
        expect(statement.declaration.type).to.equal('FunctionDeclaration');
        expect(statement.declaration.id).to.equal(null);
    });

    it('should accept an arrow function', () => {
        let statement = parseAndGetStatement('export default x => x;');
        expect(statement.declaration.type).to.equal('ArrowFunctionExpression');
    });

    it('should accept a class', () => {
        let statement = parseAndGetStatement('export default class {};');
        expect(statement.declaration.type).to.equal('ClassDeclaration');
    });

    it('should accept a function declaration', () => {
        let statement = parseAndGetStatement('export default function f() {};');
        expect(statement.declaration.type).to.equal('FunctionDeclaration');
        expect(statement.declaration.id.name).to.equal('f');
    });

    it('should accept a named class', () => {
        let statement = parseAndGetStatement('export default class C {};');
        expect(statement.declaration.type).to.equal('ClassDeclaration');
    });

    it('should not accept trailing whitespace', () => {
        let statement = parseAndGetStatement('export default 1;');
        expect(() => {
            statement.appendChild(new Token('Whitespace', '   '));
        }).to.throw('Expected end of node list but "Whitespace" found');
    });
});
