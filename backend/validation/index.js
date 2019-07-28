exports.createPostValidator = (req, res, next) => {
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 to 500 characters").isLength({
    min: 4,
    max: 500
  });
  req.check("body", "Write a body").notEmpty();
  req.check("body", "Body must be greater than 4 characters").isLength({
    min: 4
  });
  req.check("period", "Write a period").notEmpty();
  req.check("paid", "Paid yes/no?").notEmpty();
  req.check("capacity", "Write a capacity").notEmpty();
  req.check("capacity", "Capacity must be 1 or greater").isInt({ min: 1 });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.studentSignupValidator = (req, res, next) => {
  req.check("firstName", "Polje Ime ne smije biti prazno.").notEmpty();
  req.check("firstName", "Ime mora sadržavati između 3 i 30 slova.").isLength({
    min: 3,
    max: 20
  });
  req.check("lastName", "Polje Prezime ne smije biti prazno.").notEmpty();
  req
    .check("lastName", "Prezime mora sadržavati između 3 i 30 slova.")
    .isLength({
      min: 3,
      max: 20
    });
  req
    .check("birthdate", "Polje Datum rođenja ne smije biti prazno.")
    .notEmpty();
  req.check("degree", "Polje Razina studija ne smije biti prazno.").notEmpty();
  req
    .check("fieldOfStudy", "Polje Smjer studija ne smije biti prazno.")
    .notEmpty();
  req
    .check("interest", "Polje Područje interesa ne smije biti prazno.")
    .notEmpty();
  req
    .check("paid", "Polje Plaćena studentska praksa ne smije biti prazno.")
    .notEmpty();
  req
    .check("email", "Email mora biti veći od 4 znaka.")
    .matches(/.+\@.+\..+/)
    .withMessage("Email mora sadržavati @.")
    .isLength({
      min: 4,
      max: 2000
    });
  req.check("password", "Polje Lozinka ne smije biti prazno.").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Lozinka mora sadržavati minimalno 6 znakova.")
    .matches(/\d/)
    .withMessage("Lozinka mora sadržavati broj.");
  req.check("role", "Polje Uloga ne smije biti prazno.").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.companySignupValidator = (req, res, next) => {
  req.check("name", "Polje Ime ne smije biti prazno.").notEmpty();
  req.check("name", "Ime mora sadržavati između 3 i 30 slova.").isLength({
    min: 3,
    max: 20
  });
  req.check("body", "Polje Opis tvrtke ne smije biti prazno.").notEmpty();
  req.check("body", "Polje Opis tvrtke mora biti veće od 4 znaka").isLength({
    min: 4
  });
  req
    .check("email", "Email mora biti veći od 4 znaka.")
    .matches(/.+\@.+\..+/)
    .withMessage("Email mora sadržavati @.")
    .isLength({
      min: 4,
      max: 2000
    });
  req.check("password", "Polje Lozinka ne smije biti prazno.").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Lozinka mora sadržavati minimalno 6 znakova.")
    .matches(/\d/)
    .withMessage("Lozinka mora sadržavati broj.");
  req.check("contact", "Polje Kontakt ne smije biti prazno.").notEmpty();
  req.check("role", "Polje Uloga ne smije biti prazno.").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
