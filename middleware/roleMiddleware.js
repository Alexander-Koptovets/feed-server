const jwt = require("jsonwebtoken");
const {key} = require("../config/key");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(403).json({ message: 'Error' });
            }

            const { roles: userRoles } = jwt.verify(token, key);
            let isHasRole = false;
            userRoles.forEach(role => {
                if (role.includes(role)) {
                    isHasRole = true;
                }
            });

            if (!isHasRole) {
                return res.status(403).json({ message: 'You do not have permissions'});
            }

            next();
        } catch (e) {
            console.log(e);

            return res.status(403).json({ message: e });
        }
    };
};