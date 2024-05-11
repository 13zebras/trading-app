declare module 'jsonwebtoken' {
  import { Secret } from 'jsonwebtoken';

  interface JwtPayload {
    [key: string]: any;
    iss?: string | undefined;
    sub?: string | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    uri?: string | undefined;
  }

  interface SignOptions {
    algorithm: string;
    header: {
      kid: string | undefined;
      nonce: string;
    };
  }

  function sign(payload: JwtPayload, secretOrPrivateKey: Secret, options?: SignOptions): string;
}