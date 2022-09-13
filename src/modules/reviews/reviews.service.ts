import { Inject, Injectable } from '@nestjs/common';
import { REVIEW_REPOSITORY } from 'src/core/constants';
import { Review } from './review.entity';
import { ReviewDto } from './dto/review.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReviewsService {
    constructor(@Inject(REVIEW_REPOSITORY) private readonly reviewRepository: typeof Review){}

    async create(review: ReviewDto, userId):Promise<Review>{
        return await this.reviewRepository.create<Review>({...review,userId});
    
    }

    async findAll(): Promise<Review[]>{
        return await this.reviewRepository.findAll<Review>({
            include:[{model: User, attributes:{exclude:['password']}}],
        })
    }

    async findOne(id): Promise<Review>{
        return await this.reviewRepository.findOne({
            where: {id},
            include:[{model:User, attributes:{exclude:['password']}}],
        })
    }

    async delete(id, userId){
        return await this.reviewRepository.destroy({where:{id, userId}});
    }

    async update(id, data, userId){
        const[numberOfAffectedRows, [updatedReview]] = await this.reviewRepository.update({...data}, { where: {id, userId}, returning:true});
        return {numberOfAffectedRows, updatedReview};
    }

}
