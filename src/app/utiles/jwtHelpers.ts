import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (
  payload: any,
  secret: Secret,
  expiresIn: string | any,
) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn,
    });
  } catch (error) {
    console.error("JWT Token Generation Error:", error);
    throw error;
  }
};

const verifyToken = (token: string, secret: Secret) => {
  const verify = jwt.verify(token, secret) as JwtPayload;

  return verify;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
