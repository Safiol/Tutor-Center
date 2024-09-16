function makeSessionID(length) {
    let sessionID = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        sessionID += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter++;
    }
    return sessionID;
}

module.exports = { makeSessionID };
