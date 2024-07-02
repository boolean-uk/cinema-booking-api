const express = require("express")
const { getAllReviews, createReview, getReviewById, updateReview, deleteReview } = require("../controllers/review")
const router = express.Router()

router.get("/", getAllReviews)
router.post("/", createReview)
router.get("/:id", getReviewById)
router.put("/:id", updateReview)
router.delete("/:id", deleteReview)

module.exports = router
