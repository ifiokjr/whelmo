import firebase from 'react-native-firebase';

export async function firebaseSettings() {
  try {
    await firebase.firestore().settings({ persistence: true });
  } catch (e) {}
}
