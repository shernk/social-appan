// //signup route
// exports.signUp( (res, req) => {
//   const newUser = {
//     email: req.body.email,
//     password: req.body.password,
//     confirmPassword: req.body.confirmPassword,
//     handle: req.body.handle,
//   };

//   //TODO: validate data

//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(newUser.email, newUSer.password)
//     .then((data) => {
//       return res
//         .status(201)
//         .json({ message: `user ${data.user.uid} signed up successfully` });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ error: err.code });
//     });
// });
