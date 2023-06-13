const express = require("express");
const router = express.Router();
const { fetchNasa } = require("../controllers/nasaController");
const { body, validationResult } = require("express-validator");

const apodValidationRules = () => [
  body("date").optional().isISO8601().withMessage("Invalid date format"),
  body("start_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid start_date format"),
  body("end_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid end_date format"),
  body("count").optional().isInt({ gt: 0 }).withMessage("Invalid count value"),
  body("thumbs").optional().isBoolean().withMessage("Invalid thumbs value"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

router.get("/search", fetchNasa);

module.exports = router;
