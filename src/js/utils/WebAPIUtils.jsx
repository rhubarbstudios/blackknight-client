import ServerActionCreators from '../actions/ServerActionCreators';
import Constants from '../Constants';
import request from 'superagent';

function _getErrors(res) {
  let errorMsgs = ['Something went wrong, please try again'];
  let json = JSON.parse(res.text);

  if (json) {
    if (json.errors) {
      errorMsgs = json.errors;
    } else if (json.error) {
      errorMsgs = [json.error];
    }
  }
  return errorMsgs;
}

let APIEndpoints = Constants.APIEndpoints;

export default {

  signup(email, username, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: {
        email: email,
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (res.error) {
            let errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            let json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ email: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (res.error) {
            let errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            let json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  getVisitors() {
    request.get(APIEndpoints.GET_VISITORS)
    .set('Accept', 'application/json')
    .end((error, res) => {
      if (res) {
        let visitors = JSON.parse(res.text);
        ServerActionCreators.receiveVisitors(visitors);
      }
    });
  }

  // loadStories() {
  //   request.get(APIEndpoints.STORIES)
  //     .set('Accept', 'application/json')
  //     .set('Authorization', sessionStorage.getItem('accessToken'))
  //     .end((error, res) => {
  //       if (res) {
  //         let json = JSON.parse(res.text);
  //         ServerActionCreators.receiveStories(json);
  //       }
  //     });
  // },
  //
  // loadStory: function(storyId) {
  //   request.get(APIEndpoints.STORIES + '/' + storyId)
  //     .set('Accept', 'application/json')
  //     .set('Authorization', sessionStorage.getItem('accessToken'))
  //     .end(function(error, res){
  //       if (res) {
  //         json = JSON.parse(res.text);
  //         ServerActionCreators.receiveStory(json);
  //       }
  //     });
  // },
  //
  // createStory: function(title, body) {
  //   request.post(APIEndpoints.STORIES)
  //     .set('Accept', 'application/json')
  //     .set('Authorization', sessionStorage.getItem('accessToken'))
  //     .send({ story: { title: title, body: body } })
  //     .end(function(error, res){
  //       if (res) {
  //         if (res.error) {
  //           var errorMsgs = _getErrors(res);
  //           ServerActionCreators.receiveCreatedStory(null, errorMsgs);
  //         } else {
  //           json = JSON.parse(res.text);
  //           ServerActionCreators.receiveCreatedStory(json, null);
  //         }
  //       }
  //     });
  // }

};
