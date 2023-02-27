import prisma from "../config/prisma.js"
import { ErrorResponse } from "../utils/createError.js"
/**
 * @author Yousef Meska
 * @auth private
 * @route [post] /api/v1/job
 */
export const createJob = async (req, res, next) => {
    if (!req.isClient) return next(new ErrorResponse(`Only client can create a job`, 401)); //denied

    const newJob = await prisma.job.create({
        id: req.user.id,
        ...req.body,
    })
}

/**
 * @Author Meska
 * @desc edit job information
 * @access private [OWNER] 
 */
//TODO: the req.user.id == job.userId
export const editJob = async (req, res) => {

}

/**
 * @Author Meska
 * @desc delete specific job
 * @access private 
 */

//TODO: the req.user.id == job.userId
export const deleteJob = async (req, res, next) => {
    try {
        const job = await prisma.job.findFirst({
            where: {
                id: req.param.id
            }
        })
        // check for the existance of a job
        if (!job) {
            return next(new ErrorResponse(`No job found`, 404));
        }

        if (job.ownerId !== req.userId) {
            return next(new ErrorResponse(`You're not allowed to carry this operation`, 403));
        }
        await prisma.job.delete({
            where: {
                id: job.id
            }
        })

        return res.status(200).json({})
    } catch (error) {
        next(new ErrorResponse(`Something bad happend`, 500))
    }
}

export const proposeForJOb = async (req, res) => {
    const { jobId } = req.params
    const proposal = await prisma.propse.create({
        userId: 1,
        comment: `I can do it`,
        jobId: 1
    })
}


//TODO: don't forget to paginate
/**
 * Filter by (location, category, rating, title, availability) 
 */
export const searchJob = async (req, res) => {

}


/**
 * @Author Meska
 * @desc Get active jobs 
 */
export const getOpenedJobs = async (req, res, next) => {
    try {
        const jobs = await prisma.job.findMany({
            where: {
                status: "active"
            }
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @Author Meska
 * @desc client [only] can close a job 
 * @access private [CLIENT]
 */
//TODO: IsCLIENT? on the route itself 
export const closeJob = async (req, res, next) => {
    try {
        await prisma.job.update({
            where: {
                id: req.param.jobId
            },
            data: {
                status: 1
            }
        })
    } catch (error) {
        next(error)
    }
}