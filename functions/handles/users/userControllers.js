const { v4: uuidv4 } = require("uuid");
uuidv4();
const { db, admin } = require("../admin-db");
const firebaseConfig = require("../../../config");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const { validateSignUp, validateSignIn } = require("./validation");

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    // make strong password default by firebase
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  const noImg = "no-img.png";
  let token, userId;

  const { errors, valid } = validateSignUp(newUser);
  if (!valid) return res.status(400).json(errors);

  const dbDoc = db.doc(`/Users/${newUser.handle}`);
  dbDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredential = {
        userId,
        email: newUser.email,
        handle: newUser.handle,
        //TODO Append token to imageUrl.
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        createAt: new Date().toISOString(),
      };

      return dbDoc.set(userCredential);
    })
    .then(() => {
      res.status(201).json({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res.status(500).json({
          error: err.code + " - something went wrong, please try again",
        });
      }
    });
};

exports.signIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateSignIn(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        err.code = "wrong password";
      } else if (err.code === "auth/user-not-found") {
        err.code = "user not found";
      } else if (err.code === "auth/too-many-requests") {
        err.code = "too many requests";
      } else if (err.code === "auth/id-token-expired") {
        err.code = "id token expired";
      }
      return res.status(403).json({ error: err.code + " , please try again" });
    });
};

exports.uploadImage = (req, res) => {
  const Busboy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new Busboy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};
  let generatedToken = uuidv4();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(
      `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
    );
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return res.status(400).json({ error: "Wrong file type submitted!" });
    }

    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];

    // random name of an image created 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;

    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };

    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebasesStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Appen Token to URL
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;

        return db.doc(`/Users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });

  // The raw bytes of the upload will be in req.rawBody.
  // Send it to busboy, and get a callback when it's finished.
  busboy.end(req.rawBody);
};
