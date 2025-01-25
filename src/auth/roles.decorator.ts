import { SetMetadata } from '@nestjs/common';

/**
 * Roles decorator
 * Kullanıcı için gerekli rolleri belirlemek için kullanılır.
 * Örneğin: @Roles('admin', 'staff')
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
