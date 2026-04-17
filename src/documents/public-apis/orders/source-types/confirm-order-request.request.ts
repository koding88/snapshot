import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmOrderRequest {
  @IsString()
  @IsNotEmpty()
  token!: string;
}
