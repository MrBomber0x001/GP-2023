import JWT from 'jsonwebtoken'
export const signToken = (obj) => {
    return JWT.sign(obj);
}
export const verfiyToken = async (token) => {
    await JWT.verify(token);
}