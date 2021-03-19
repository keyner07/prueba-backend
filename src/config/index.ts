/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

dotenv.config();
export default abstract class Config {
    private static readonly ENV: NodeJS.ProcessEnv = process.env;
    public static readonly PORT: number = parseInt(Config.ENV.PORT!) || 3000;
    public static readonly SALT: number = parseInt(Config.ENV.SALT!) || 10;
    public static readonly JWTSECRET: string = Config.ENV.JWTSECRET || 'somesecret';
}
