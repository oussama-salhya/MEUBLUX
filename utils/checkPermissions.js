import { BadRequestError } from "../errors/index.js"

const checkPermissions = (reqUser, reviewUserId) => {
    // if(reqUser.role === 'admin') return 
    if (reqUser.userId === reviewUserId.toString()) return
    throw new BadRequestError('not authorized to access this route')
}


export default checkPermissions