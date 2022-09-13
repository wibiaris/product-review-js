import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  imports: [AuthModule]
})
export class UsersModule {}
