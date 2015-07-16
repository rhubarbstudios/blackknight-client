import ServerActionCreators from '../actions/ServerActionCreators';
import Constants from '../Constants';
// let request = require('superagent-promise')(require('superagent'), Promise);
import request from 'superagent';
let APIEndpoints = Constants.APIEndpoints;

// function _getErrors(res) {
//   let errorMsgs = ['Something went wrong, please try again'];
//   let json = JSON.parse(res.text);
//
//   if (json) {
//     if (json.errors) {
//       errorMsgs = json.errors;
//     } else if (json.error) {
//       errorMsgs = [json.error];
//     }
//   }
//   return errorMsgs;
// }

function handleResponse(err, res) {
  return new Promise((resolve, reject) => {
    if (res) {
      if (res.status < 300) {
        resolve(res.body);
      } else {
        reject(res.body.message);
      }
    } else {
      reject(err);
    }
  });
}

export default {

  // signup(email, username, password, passwordConfirmation) {
  //   request.post(APIEndpoints.REGISTRATION)
  //     .send({ user: {
  //       email: email,
  //       username: username,
  //       password: password,
  //       password_confirmation: passwordConfirmation
  //     }})
  //     .set('Accept', 'application/json')
  //     .end((error, res) => {
  //       if (res) {
  //         if (res.error) {
  //           let errorMsgs = _getErrors(res);
  //           ServerActionCreators.receiveLogin(null, errorMsgs);
  //         } else {
  //           let json = JSON.parse(res.text);
  //           ServerActionCreators.receiveLogin(json, null);
  //         }
  //       }
  //     });
  // },
  //
  // login(email, password) {
  //   request.post(APIEndpoints.LOGIN)
  //     .send({ email: email, password: password, grant_type: 'password' })
  //     .set('Accept', 'application/json')
  //     .end((error, res) => {
  //       if (res) {
  //         if (res.error) {
  //           let errorMsgs = _getErrors(res);
  //           ServerActionCreators.receiveLogin(null, errorMsgs);
  //         } else {
  //           let json = JSON.parse(res.text);
  //           ServerActionCreators.receiveLogin(json, null);
  //         }
  //       }
  //     });
  // },

  getVisitors() {
    request
      .get(APIEndpoints.GET_VISITORS)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          let visitors = JSON.parse(res.text);
          ServerActionCreators.receiveVisitors(error, visitors);
        }
      });
  },

  getVisitor(id) {
    request
      .get(APIEndpoints.GET_VISITOR + '/' + id)
      .set('Accept', 'application/json')
      .end((...args) => {
        handleResponse(...args)
        .then(res => {
          ServerActionCreators.receiveVisitor(null, res);
        })
        .catch(err => {
          ServerActionCreators.receiveVisitor(err, null);
        });
      });
  },

  saveVisitor(visitor) {
    visitor.needsApproval = visitor.needsApproval || false;

    request
      .post(APIEndpoints.SAVE_VISITOR)
      .send(visitor)
      .set('Accept', 'application/json')
      .end((...args) => {
        handleResponse(...args)
        .then(res => {
          ServerActionCreators.receiveVisitorUpdate(null, res);
        })
        .catch(err => {
          ServerActionCreators.receiveVisitorUpdate(err, null);
        });
      });

      //
      // .then(res => {
      //   ServerActionCreators.receiveVisitorUpdate(null, res.body);
      // })
      // .catch(error => {
      //   console.log('error obj: ', error);
      //   ServerActionCreators.receiveVisitorUpdate(error.message, null);
      // });
      // .end((error, response) => {
      //   let rawResponse = JSON.parse(response.text);
      //   ServerActionCreators.receiveVisitorUpdate(error, rawResponse);
      // });
  }

};
