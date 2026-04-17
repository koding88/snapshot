import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { ORDER_DISCOVERY_SOURCES } from '../../../orders.types';

class MoneyRequest {
  @Type(() => Number)
  @Min(0)
  amount!: number;

  @IsString()
  @Matches(/^[A-Za-z]{3}$/)
  currency!: string;
}

export class SubmitOrderRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @Matches(/^[A-Za-z]{2}$/)
  countryCode!: string;

  @IsString()
  @IsNotEmpty()
  galleryId!: string;

  @IsOptional()
  @IsString()
  packageId?: string;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => MoneyRequest)
  budget?: MoneyRequest;

  @IsString()
  @IsIn(ORDER_DISCOVERY_SOURCES)
  discoverySource!: (typeof ORDER_DISCOVERY_SOURCES)[number];

  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  personalStory!: string;
}
