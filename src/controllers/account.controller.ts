import { Body, Controller, Get, Headers, Put } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { IncomingHttpHeaders } from 'http';

import { AddContactDto, DeleteContactDto, UpdateAccountDto } from 'src/dto';

import { AccountService } from 'src/services';

@ApiTags('Аккаунт пользователя')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  getAccount(@Headers() headers: IncomingHttpHeaders) {
    return this.accountService.getAccount(headers);
  }

  @Put()
  updateAccount(
    @Body() dto: UpdateAccountDto,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return this.accountService.updateAccount(dto, headers);
  }

  @Put('/contacts/add')
  addContact(
    @Body() dto: AddContactDto,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return this.accountService.addContact(dto, headers);
  }

  @Put('/contacts/delete')
  deleteContact(
    @Body() dto: DeleteContactDto,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return this.accountService.deleteContact(dto, headers);
  }
}
