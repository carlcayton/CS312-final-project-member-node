const router = require("express").Router();
const db = require("../services/db.js")

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `user` WHERE `user_id`=?", [id] ).then((results) => {
    	res.json(results)
    });
})

/**
 * This function returns the list of events that the member has participated in
 */
router.post("/joined/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM event_members WHERE `user_id`=?", [id]).then((results) => {
        res.json(results);
    })
});

module.exports = router;
