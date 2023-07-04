import * as bcrypt from 'bcrypt';

class AuthUtil {
    static hashPass(password: string){
        return bcrypt.hash(password, 10)
    }
}

export default new AuthUtil()