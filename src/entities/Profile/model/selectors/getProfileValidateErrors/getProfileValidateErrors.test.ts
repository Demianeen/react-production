import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profile.types';
import { getProfileValidateErrors } from './getProfileValidateErrors';

const errorsList = [
    ValidateProfileError.SERVER_ERROR,
    ValidateProfileError.INCORRECT_AGE,
];
describe('getProfileValidateErrors', () => {
    const state: DeepPartial<StateSchema> = {
        profile: {
            validateErrors: errorsList,
        },
    };

    test('should return errors', () => {
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(errorsList);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
