import { SetMetadata } from "@nestjs/common/decorators";
import { Role } from "src/modules/user/entities/role.enum";


export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);