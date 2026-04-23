import { IsIn, IsString } from 'class-validator';

export class UpdatePlayerRoleDto {
  @IsString()
  @IsIn(['starter', 'bench', 'reserve'])
  role: string;
}