import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value))
      throw new BadRequestException(
        `'${value}' is not a valid ObjectId from Mongo. Refer to https://www.mongodb.com/developer/products/mongodb/bson-data-types-objectid/ for more information.`,
      );
    return value;
  }
}
