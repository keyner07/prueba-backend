/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

dotenv.config();
export default abstract class Config {
    private static readonly ENV: NodeJS.ProcessEnv = process.env;
    public static readonly PORT: number = parseInt(Config.ENV.PORT!) || 3000;
    public static readonly SALT: number = parseInt(Config.ENV.SALT!);
    public static readonly JWTSECRET: string = Config.ENV.JWTSECRET || 'somesecret';
    public static readonly HOSTSMTP: string = Config.ENV.HOSTSMTP || 'smtp.mailtrap.io';
    public static readonly FROMSMTP: string = Config.ENV.FROMSMTP || 'from@example.com';
}