export enum Role {
  STUDENT = "STUDENT",
  PARENT = "PARENT",
  ADMIN = "ADMIN",
}

export interface JwtPayload {
  userId: number;
  role: Role;
}
