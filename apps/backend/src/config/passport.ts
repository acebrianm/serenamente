import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../utils/database';
import { generateToken } from '../utils/jwt';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID']!,
      clientSecret: process.env['GOOGLE_CLIENT_SECRET']!,
      callbackURL: '/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error('No email found in Google profile'), undefined);
        }

        let user = await prisma.user.findFirst({
          where: {
            OR: [{ googleId: profile.id }, { email: email }],
          },
        });

        if (user) {
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                googleId: profile.id,
                provider: 'GOOGLE',
                profilePicture: profile.photos?.[0]?.value,
              },
            });
          }
        } else {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              firstName: profile.name?.givenName || '',
              lastName: profile.name?.familyName || '',
              email: email,
              provider: 'GOOGLE',
              profilePicture: profile.photos?.[0]?.value,
            },
          });
        }

        const token = generateToken(user);
        return done(null, { user, token });
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
