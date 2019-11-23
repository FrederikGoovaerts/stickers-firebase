// Load main components
import * as firebase from "firebase";

interface Log {
  credits: number;
  log: string;
}

interface Spending {
  credits: number;
  recordDate: {
    seconds: number;
  };
}

export class FirebaseWrapper {
  private _firebaseInstance: firebase.app.App;
  private _firestore: firebase.firestore.Firestore;
  private _user: firebase.User | undefined;
  private _authCallback: ((param: boolean) => void) | undefined;

  constructor(firebaseConfig: Object) {
    this._firebaseInstance = firebase.initializeApp(firebaseConfig);
    this._firebaseInstance.auth().onAuthStateChanged(user => {
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

  private getUserItems(col: string): Promise<firebase.firestore.QuerySnapshot> {
    if (!this._user) {
      return Promise.reject();
    }
    return this._firestore
      .collection(col)
      .where("uid", "==", this._user.uid)
      .get();
  }

  private getLatestUserItems(
    col: string,
    amount: number
  ): Promise<firebase.firestore.QuerySnapshot> {
    if (!this._user) {
      return Promise.reject();
    }
    return this._firestore
      .collection(col)
      .where("uid", "==", this._user.uid)
      .orderBy("recordDate", "desc")
      .limit(amount)
      .get();
  }

  setAuthCallback(callback: ((param: boolean) => void) | undefined) {
    this._authCallback = callback;
  }

  async getLastLogs(amount: number): Promise<string[]> {
    if (!this._user) {
      return Promise.reject();
    }
    const logs = await this.getLatestUserItems("logs", amount);
    return logs.docs.map(
      value => (value.data({ serverTimestamps: "estimate" }) as Log).log
    );
  }

  async getLastSpendings(amount: number): Promise<string[]> {
    if (!this._user) {
      return Promise.reject();
    }
    const logs = await this.getLatestUserItems("spending", amount);
    return logs.docs
      .map(value => value.data({ serverTimestamps: "estimate" }) as Spending)
      .map(
        value =>
          `${value.credits} credits on ${new Date(
            value.recordDate.seconds * 1000
          ).toLocaleDateString()}`
      );
  }

  async getAvailableCredits(): Promise<number> {
    const logs = await this.getUserItems("logs");
    const creditsClaimed = logs.docs
      .map(value => {
        return (value.data() as Log).credits;
      })
      .reduce((prev, curr) => prev + curr);

    const spendings = await this.getUserItems("spending");
    const creditsSpent = spendings.docs
      .map(value => (value.data() as Spending).credits)
      .reduce((prev, curr) => prev + curr);

    return creditsClaimed - creditsSpent;
  }

  async addLog(log: string, credits: number): Promise<void> {
    if (!this._user) {
      return Promise.reject();
    }
    await this._firestore.collection("logs").add({
      log,
      credits,
      uid: this._user.uid,
      recordDate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async addSpending(credits: number): Promise<void> {
    if (!this._user) {
      return Promise.reject();
    }
    await this._firestore.collection("spending").add({
      credits,
      uid: this._user.uid,
      recordDate: firebase.firestore.FieldValue.serverTimestamp()
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
