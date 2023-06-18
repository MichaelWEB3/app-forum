const bcrypt = require('bcrypt');

export default function HasPAss(unHasPass: string) {
    return bcrypt.hash(unHasPass, 10).then((hash: string) => hash)
}
