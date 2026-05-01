// A simple validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

describe('Unit Tests: Authentication Logic', () => {
    
    test('should return true for a valid email format', () => {
        const result = isValidEmail('test@student.fi');
        expect(result).toBe(true);
    });

    test('should return false for an email missing the @ symbol', () => {
        const result = isValidEmail('teststudent.fi');
        expect(result).toBe(false);
    });

    test('should return false for an empty string', () => {
        const result = isValidEmail('');
        expect(result).toBe(false);
    });

});