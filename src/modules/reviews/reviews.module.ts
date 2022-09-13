import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { reviewsProviders } from './reviews.providers';

@Module({
  providers: [ReviewsService, ...reviewsProviders],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
