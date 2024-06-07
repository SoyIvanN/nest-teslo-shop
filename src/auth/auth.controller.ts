import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Auth, GetUser, RawHeaders } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.createUser( createAuthDto );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto );
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User,) {
    return this.authService.checkAuthStatus( user );
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
      @Req() request: Express.Request,
      @GetUser() user: User,
      @GetUser('email') userEmail: string,
      @RawHeaders() rawHeaders: string[]
  ) {
    console.log(request)
    return {
      ok: true,
      mess: 'olo',
      user,
      userEmail,
      rawHeaders
    }
  }

  @Get('private2')
  @RoleProtected( ValidRoles.admin )
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User
  ){
    return {
      ok:true,
      user
    }
  }

  @Get('private3')
  @Auth( ValidRoles.admin )
  privateRoute3(
    @GetUser() user: User
  ){
    return {
      ok:true,
      user
    }
  }
}
