import { JwtPayload, jwtDecode } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  role: "user" | "admin";
}
export const tokenVerify = (token: string): MyJwtPayload => {
  return jwtDecode<MyJwtPayload>(token);
};
