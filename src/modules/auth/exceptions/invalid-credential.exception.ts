import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialException extends UnauthorizedException {
    constructor() {
        super({
            message: 'INVALID CREDENTIAL',
            statusCode: HttpStatus.UNAUTHORIZED,
        });
    }
}
