exports.createPostValidator = (req, res, next) => {
  req.check("title", "Polje naslov ne smije biti prazno.").notEmpty();
  req
    .check("title", "Naslov mora sadržavati između 4 i 500 karaktera.")
    .isLength({
      min: 4,
      max: 500
    });
  req.check("body", "Polje Opis prakse ne smije biti prazno.").notEmpty();
  req
    .check("body", "Opis prakse mora sadržavati više od 4 karaktera.")
    .isLength({
      min: 4
    });
  req.check("period", "Polje Trajanje prakse ne smije biti prazno.").notEmpty();
  req.check("paid", "Polje Plaćena praksa ne smije biti prazno.").notEmpty();
  req.check("capacity", "Polje Broj studenata ne smije biti prazno").notEmpty();
  req
    .check("capacity", "Polje Broj studenata mora biti veće od 1.")
    .isInt({ min: 1 });

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
    max: 30
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
    max: 30
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
