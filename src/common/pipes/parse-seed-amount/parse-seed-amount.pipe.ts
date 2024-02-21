import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseSeedAmountPipe implements PipeTransform {
  private readonly DEFAULT_SEED_AMOUNT = 100;

  transform(amount: string, metadata: ArgumentMetadata) {
    if (!amount || amount.toString().trim().length === 0)
      return this.DEFAULT_SEED_AMOUNT;

    if (isNaN(+amount) || +amount <= 0)
      throw new BadRequestException(
        `'${amount}' is not a valid seed amount, if included, the seed amount should be a positive integer query param`,
      );

    if (+amount > 10000) return 10000;

    return +amount;
  }
}
