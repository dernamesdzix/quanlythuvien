const router = require("express").Router();
const Issue = require("../models/issueModel");
const Book = require("../models/bookModel");
const authMiddlewares = require("../middleWares/authMiddlewares");

// issues a book to partron
router.post("/issues-new-book", authMiddlewares, async (req, res) => {
  try {
    // check stock (available copies must decremented by 1)
    await Book.findOneAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: -1 } }
    );
    // issue book to patron (create new issue record)
    const newIssue = new Issue(req.body);
    await newIssue.save();
    return res.send({
      success: true,
      message: "Book issued successfully",
      data: newIssue,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
