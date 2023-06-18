const bcrypt = require('bcrypt');

export default function InsHash(unhas: string, unHasPass: string): any {
    return (
        bcrypt.compare(unhas, unHasPass).then((result: boolean) => result)
    )
} 