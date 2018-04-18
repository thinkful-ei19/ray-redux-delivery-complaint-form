export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export function fiveCharacters(value) {
    if(value.length !== 5) {
        return 'Must be exactly 5 characters';
    }
}

export function nonNumber(value) {
    if(isNaN(value)) {
        return 'Must be numbers';
    }
}

