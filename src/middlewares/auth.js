import { constants } from "../config/constants";
import { ErrorResponse } from "../utils/createError";


export const isStore = (req, res, next) => {
    if (req.user.person != 'store') {
        return res.status(403).json({ success: false, msg: 'Forbidden' });
    }

    next();
}


export const isReader = (req, res, next) => {
    console.log(`inside Reader`, req.user);
    console.log(req.user.person);

    if (req.user.person != 'reader') {
        return res.status(403).json({ success: false, msg: 'Forbidden' })
    }
    next();
}

export const requireAdmin = (req, res, next) => {
    if (!isAdmin(req.user)) {
        return res.status(403).json({ success: false, msg: 'Forbidden' })
    }
    next();
}

const isAdmin = ({ role }) => constants.ADMIN_ROLES.includes(role); // ['one', 'two']