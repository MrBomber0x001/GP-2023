import { ErrorResponse } from "../utils/createError"

/**
 * @Author Meska
 * @desc The client can add a review for the job
 */
export const addReview = async (req, res, next) => {
    // res.send(`you cannot add review for yourself`)
    // if(req.)

    const review = await prisma.review.find({
        where: {
            jobId: req.body.jobId,
            userId: req.userId
        }
    })

    if (review) {
        return next(new ErrorResponse(`You've already posted a review!`, 403));
    }
    const newReview = await prisma.review.create({
        data: {
            userId: req.userId,
            jobId: req.body.jobId,
            desc: req.body.desc,
            rate: req.body.rate
        }
    })

}

export const editReview = async (req, res) => {

}
/**
 * @Author Meska
 * @desc Get all the reviews for the user
 * @route GET `/v1/api/reviews/:userId/ 
 */
export const getAllReview = async (req, res) => {

}

export const getReview = async (req, res) => {

}