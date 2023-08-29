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

// get issues
router.post("/get-issues", authMiddlewares, async (req, res) => {
  try {
    delete req.body.userIdFromToken;
    const issues = await Issue.find(req.body).populate("book").populate("user");
    return res.send({
      success: true,
      message: "Issues Fetched Successfully",
      data: issues,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// return a book
router.post("/return-book", authMiddlewares, async (req, res) => {
  try {
    // inventory adjustment (available copies must be incremented by 1)
    await Book.findOneAndUpdate(
      {
        _id: req.body.book,
      },
      {
        $inc: { availableCopies: 1 },
      }
    );

    // return book (update issue record)
    await Issue.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body
    );

    return res.send({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete an issue
router.post("/delete-issue", authMiddlewares, async (req, res) => {
  try {
    // inventory adjustment (available copies must be incremented by 1)
    await Book.findOneAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: 1 } }
    );

    // delete issue
    await Issue.findOneAndDelete({ _id: req.body._id });
    res.send({ success: true, message: "Issue deleted successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});
module.exports = router;
