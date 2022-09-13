import {Review} from './review.entity'
import {REVIEW_REPOSITORY} from '../../core/constants';

export const reviewsProviders = [{
    provide: REVIEW_REPOSITORY,
    useValue: Review,
}];