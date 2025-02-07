import { RoleDto } from "./role.dto";

export class GroupCreateDto {
    name: string;
}

export class GroupRoleDto {
    roles: RoleDto[];
}