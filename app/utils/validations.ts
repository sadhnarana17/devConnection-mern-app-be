import validator from 'validator';

interface CreateAccountRequest {
    body: {
        firstName: string;
        lastName: string;
        email: string;
        age: number;
        password: string;
        gender: string;
    };
}

export const validateCreateAccountData = (req: CreateAccountRequest) => {
    const { firstName, lastName, email, age, password, gender } = req.body;
    if(!firstName || !lastName || !email || !age || !password || !gender) {
        throw new Error('Missing required fields');
    }
    if(typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof password !== 'string' || gender && typeof gender !== 'string') {
        throw new Error('Invalid data types');
    }
    if(!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }
    if(!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) {
        throw new Error('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.');
    }
    if(typeof age !== 'number' || age < 13 || age > 120) {
        throw new Error('Age must be a number between 13 and 120');
    }
}