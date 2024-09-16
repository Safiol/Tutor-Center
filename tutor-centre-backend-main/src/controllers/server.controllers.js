const test = async (req, res) => {
    console.log("test route called");
    res.send("hello world!");
};

module.exports = { test };
