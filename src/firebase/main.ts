// Load main components
import * as firebase from "firebase";

export class FirebaseWrapper {
  private _firebaseInstance: firebase.app.App;
  private _firestore: firebase.firestore.Firestore;
  private _user: firebase.User | undefined;
  private _authCallback: ((param: boolean) => void) | undefined;

  constructor(firebaseConfig: Object) {
    this._firebaseInstance = firebase.initializeApp(firebaseConfig);
    this._firebaseInstance.auth().onAuthStateChanged(user => {
      console.log("auth change", !!user);
      const authenticated = !!user;
      if (user) {
        this._user = user;
      }
      this._authCallback?.(authenticated);
    });
    this._firestore = this._firebaseInstance.firestore();
  }

  get authenticated(): boolean {
    return !!this._user;
  }

  get user(): firebase.User | undefined {
    return this._user;
  }

  setAuthCallback(callback: ((param: boolean) => void) | undefined) {
    this._authCallback = callback;
  }

  async getLogs(): Promise<string[]> {
    if (!this._user) {
      return Promise.resolve([]);
    }
    const logs = await this._firestore
      .collection("logs")
      .where("uid", "==", this._user.uid)
      .get();
    return logs.docs.map((value: any) => value.data().log);
  }

  async addLog(log: string): Promise<void> {
    if (!this._user) {
      return Promise.resolve();
    }
    this._firestore.collection("logs").add({
      uid: this._user.uid,
      log: log,
      recordDate: firebase.firestore.Timestamp.fromDate(new Date())
    });
  }

  async logIn() {
    await this._firebaseInstance
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async logOut() {
    await this._firebaseInstance.auth().signOut();
  }
}
