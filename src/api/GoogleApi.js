/* global gapi */
let instance = null;

class GoogleAPI {

  constructor() {
    if (!instance) {
      instance = this;
      this.isSignedIn = false;
      // Save gapi global var here for later reference
      this.gapi = gapi;
    }

    return instance;
  }

  init() {
    return new Promise((resolve, reject) => {
      // if already authenticated, just resolve the promise immediately.
      this.isSignedIn && resolve({
        isSignedIn: true,
        accessToken: this.currentUser.getAuthResponse().access_token,
      });

      // Otherwise, initialize the API by setting the API key and
      // calling gapi.init.
      gapi.client.setApiKey('AIzaSyCEdUUQ_t24Jr5n6cN8k3yqtMX_xiXsoPM');
      gapi.auth2.init({
        client_id: '439592290259-7mdjaiiubqnh7oq716flho84acfvcs8v.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/youtube'
      }).then((GoogleAuth) => {
        this.googleAuth = GoogleAuth;
        // Will this be here if the user isn't signed in?
        this.currentUser = this.googleAuth.currentUser.get();
        this.isSignedIn = this.googleAuth.isSignedIn.get();
        resolve({
          isSignedIn: this.isSignedIn,
          accessToken: this.currentUser.getAuthResponse().access_token,
        });
      });
    });
  }

  signIn() {
    // Wrap the googleAuth promise in a standard JavaScript promise
    return new Promise((resolve, reject) => {
      if (this.googleAuth) {
        this.googleAuth.signIn().then((info) => {
          resolve(info);
        }, (err) => {
          reject('An unknown error occurred with Google Sign In', err);
        });
      } else {
        reject('GoogleAuth does not seem to exist. Have you initialized it?');
      }
    });
  }

  signOut() {
    // Wrap the googleAuth promise in a standard JavaScript promise
    return new Promise((resolve, reject) => {
      if (this.googleAuth) {
        this.googleAuth.signOut().then((info) => {
          resolve(info);
        }, () => {
          reject('An unknown error occurred with Google Sign Out');
        });
      } else {
        reject('GoogleAuth does not seem to exist. Have you initialized it?');
      }
    });
  }

  disconnect() {
    // Wrap the googleAuth promise in a standard JavaScript promise
    return new Promise((resolve, reject) => {
      if (this.googleAuth) {
        this.googleAuth.disconnect().then((info) => {
          resolve(info);
        }, () => {
          reject('An unknown error occurred with Google Disconnect');
        });
      } else {
        reject('GoogleAuth does not seem to exist. Have you initialized it?');
      }
    });
  }

  // Make an arbitrary request with the gapi client. This is an alternative
  // to loading the discovery document associated with each API and requesting
  // through that.
  request(requestObj) {
    // Wrap the googleAuth promise in a standard JavaScript promise
    return new Promise((resolve, reject) => {
      this.gapi.client.request(requestObj).then((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getBasicProfile() {
    const basicProfile = this.currentUser.getBasicProfile();
    return {
      id: basicProfile.getId(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      username: basicProfile.getEmail().split('@')[0],
    };
  }
}

export default GoogleAPI;
