const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const db = require('../lib/db');
const userMiddleware = require('../middleware/users.js');

//http://localhost:8080/api/sign-up
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
        req.body.email
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: 'This email is already in use!'
          });
        } else {
          // email is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO users (id, email, password, createdAt , updatedAt) VALUES ('${db.escape(
                  )}', ${db.escape(
                  req.body.email
                )}, ${db.escape(hash)}, now() , now())`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  db.query(
                    `INSERT INTO sellers (id, email, password, first_name, last_name, phone_number, createdAt , updatedAt) VALUES ('${db.escape(
                        )}', ${db.escape(
                        req.body.email
                      )}, ${db.escape(hash)}, ${db.escape(
                        req.body.first_name
                      )},${db.escape(
                        req.body.last_name
                      )},${db.escape(
                        req.body.phone_number
                      )}, now() , now())`
                  );
                  return res.status(201).send({
                    msg: 'Registered!'
                  });
                }
              );
            }
          });
        }
      }
    );
  });

//http://localhost:8080/api/login
router.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
  
        if (!result.length) {
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          });
        }
  
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Username or password is incorrect!'
              });
            }
  
            if (bResult) {
              const token = jwt.sign({
                  username: result[0].username,
                  userId: result[0].id
                },
                'SECRETKEY', {
                  expiresIn: '7d'
                }
              );
  
              /*db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );*/
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Email or password is incorrect!'
            });
          }
        );
      }
    );
  });

//http://localhost:8080/api/secret-route
router.get('/secret-route',(req, res, next) =>{})

module.exports = router;