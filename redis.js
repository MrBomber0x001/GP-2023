const getAverage = async (location, startDate, endDate) => {
    const cacheKey = `weather:${location}:${startDate}:${endDate}:average`

    let cacheEntry = await redis.get(cacheKey)
    if (cacheEntry) {
        cacheEntry = JSON.parse(cacheEntry)
        return { ...cacheEntry, 'source': 'cache' }
    }

    const tavg_average_sql = `SELECT AVG(tavg)
							  FROM weather_measurements
							  WHERE date
							  BETWEEN (?) AND (?)`
    await db.open()
    const dbEntry = await db.get(tavg_average_sql, [startDate, endDate])
    redis.setex(cacheKey, 43000, dbEntry)
    return { ...dbEntry, 'source': 'datebase' }
}