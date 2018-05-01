import firebase from 'react-native-firebase';

export async function firebaseSettings() {
  try {
    firebase.firestore().settings({ persistence: true });
  } catch (e) {}
}
