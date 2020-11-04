import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

import { findByEmail } from '../controllers/auth';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const local = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email: string, password: string, done: any) => {
    try {
      const user = await findByEmail(email);

      if (!user) {
        return done(null, false, { message: `Email ${email} not found` });
      }

      const passCheck = user.password === password;

      if (!passCheck) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      console.log('error', error);
    }
  }
);

const jwt = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'abcd',
  },
  async (jwtPayload, done) => {
    const { email } = jwtPayload;
    const user = await findByEmail(email);

    if (!user) return done(null, false);

    return done(null, user);
  }
);

export default { local, jwt };
