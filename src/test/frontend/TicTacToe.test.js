/**
 * 
 */
import { expect, test } from 'vitest'
import {calculateWinner} from './frontend/src/App.jsx';
test('calculateWinnerTest', () => {
	const array = Array(9).fill(null);
	array[0] = "X";
	array[1] = "X";
	array[2] = "X";
	expect(calculateWinner(array)).toBe("X");
});
