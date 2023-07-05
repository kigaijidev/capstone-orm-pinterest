'use strict';

import { v4 as uuidV4 } from "uuid";
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class AuthUser {
    user_id: number;
    full_name: string;
    email: string;
    cacheId: string;

    constructor(data: {
        user_id: number;
        full_name: string;
        email: string;
    }) {
        this.user_id = data.user_id;
        this.full_name = data.full_name;
        this.email = data.email;
        this.cacheId = uuidV4();
    }

    toJSON(){
        return {
            user_id: this.user_id,
            full_name: this.full_name,
            email: this.email,
            cacheId: this.cacheId,
        }
    }
}
