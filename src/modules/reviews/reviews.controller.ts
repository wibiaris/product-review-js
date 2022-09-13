import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReviewsService } from './reviews.service';
import { Review as ReviewEntity, Review } from './review.entity';
import { ReviewDto } from './dto/review.dto';


@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewService: ReviewsService){}

    @Get()
    async findAll(){
        return await this.reviewService.findAll();
    }
    
    @Get(':id')
    async findOne(@Param('id')id:number): Promise<ReviewEntity> {
        const review = await this.reviewService.findOne(id);

        if (!review){
            throw new NotFoundException('This Review doesn\'t exist');
        }
        return review;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() review: ReviewDto, @Request() req): Promise<ReviewEntity>{
        return await this.reviewService.create(review, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body()review:ReviewDto, @Request() req):Promise<ReviewEntity>{
        const {numberOfAffectedRows, updatedReview} = await this.reviewService.update(id, review, req.user.id);

        if (numberOfAffectedRows === 0){
            throw new NotFoundException('This Review doesn\'t exist');
        }

        return updatedReview;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req){
        const deleted = await this.reviewService.delete(id, req.user.id);

        // if the number of row affected is zero, 
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Review doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }


}
