class SessionController {
    async store(req, res) {
        res.status(200).send();
    }
}

module.exports = new SessionController();