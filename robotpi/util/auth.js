const username = process.argv[2];
const password = process.argv[3];

export const authorize = authorization => {
    if (!authorization) return false;
    
    if (authorization.includes(' ')) {
        return Buffer.from(authorization.split(' ')[1], 'base64').toString() === (username + ':' + password);
    }
    
    return Buffer.from(authorization, 'base64').toString() === (username + ':' + password);
}
    