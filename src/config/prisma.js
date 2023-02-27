import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



prisma.$use(async (params, next) => {
    const before = Date.now()
    const result = await next(params);
    const after = Date.now();


    console.log(`Query took ${after - before}ms`);
    return result
})


// or we can use

// const prisma = new PrismaClient({
//log: [{emit: "event", level: "query"}]
//})

/**
 * prisma.$on("query", async(e) => {
 *  console.log(`Query: ${e.query}`)
 *  console.log(`Params: ${e.params}`)
 * // The SQL queries (with filled in parameters) can be copied and prefixed with EXPLAIN to view the query plan the database will provide.
 * })
 */
export default prisma

// You can use the logged data to determine which Prisma queries are slow. You can use the logs to gauge queries that could require some performance improvements.