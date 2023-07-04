import { ConflictException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistException extends ConflictException {
    constructor() {
        super({
            message: 'USER ALREADY EXIST',
            statusCode: HttpStatus.CONFLICT,
        });
    }
}
