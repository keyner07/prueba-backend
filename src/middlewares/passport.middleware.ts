import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { General } from '../utils';
import { EntityRepository, UserEntity } from '../entity';

import Config from '../config';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.JWTSECRET,
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await new EntityRepository<UserEntity>(UserEntity).findOne(payload.id, {
            select: ['id', 'email'],
            where: { isActive: true},
        });
        const { exp, role } = payload;
        if (exp < Date.now()) {
            if (user) return done(null, Object.assign(user, { role }));

            return done(null, false, { message: 'The token is expired.' });
        }
        return done(null, false, { message: 'Unauthorized.' });
    } catch (err) {
        throw new General(500, err);
    }
});