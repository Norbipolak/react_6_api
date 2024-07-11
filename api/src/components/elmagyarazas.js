/*
The auth object typically refers to an instance of the authentication service provided by libraries like Firebase. It is used to handle authentication-related tasks such as user sign-up, sign-in, password resets, and more.

Firebase Authentication
In the context of Firebase Authentication, the auth object is an instance of the firebase.auth.Auth class. This object provides methods for managing users, handling authentication states, and performing authentication-related tasks.

Initialization
Before you can use the auth object, you need to initialize Firebase in your application. Here's an example of how you might do this:
*/
import firebase from "firebase/app";
import "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth object
const auth = firebase.auth();

/*
auth Object
The auth object contains several properties and methods. 
One of the key properties is currentUser, which represents the currently signed-in user (if any).

currentUser Property
The currentUser property is a firebase.User object representing the currently signed-in user. 
If no user is signed in, currentUser is null.
*/
// Check if a user is currently signed in
if (auth.currentUser) {
    console.log("User is signed in:", auth.currentUser);
  } else {
    console.log("No user is signed in.");
  }
  
  // Sign up a new user
  const register = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log("User registered:", userCredential.user);
    } catch (error) {
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);
    }
  };
  
  // Sign in a user
  const signIn = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);
    }
  };
  
  // Sign out the current user
  const signOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out.");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

/*
Fontos!!!!! 
The auth object provides several methods for managing authentication:

createUserWithEmailAndPassword(email, password): Creates a new user with the given email and password.

signInWithEmailAndPassword(email, password): Signs in a user with the given email and password.

signOut(): Signs out the current user.

onAuthStateChanged(callback): Registers a callback to be called whenever the authentication state changes.

sendPasswordResetEmail(email): Sends a password reset email to the given email address.  
*/

auth.onAuthStateChanged(user => {
    if (user) {
      console.log("User is signed in:", user);
    } else {
      console.log("No user is signed in.");
    }
  });
  
/*
onAuthStateChange ez egy observer, ami figyeli, hogy a user az be van jelentkezva vagy nem, ez minden esetben vár egy callback-et 
u pedig amit itt megadunk neki az a user objektum!!!! 
és itt kell egy userData változó, amiben elmentjük a user-nek az adatait!!!!!!!! 
ha az email pedig valamiért nem lett verifikálva, akkor visszadobjuk a login-ra és addig nem engedjük be!!!  
*/
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setUserData(u);
                setEmail(u.email);
                if (!u.emailVerified) {
                    navigate("/");
                }
            } else {
                navigate("/login");
            }
        });
    }, [auth, navigate]);

/*
*********************************************************************************************************************************************
In Firebase Authentication, the User object represents a user account. 
It contains a variety of properties and methods that provide information about the user and allow for managing the user account.

1. displayName: The display name of the user, if set.

2. email: The email address of the user.

3. emailVerified: A boolean indicating whether the user's email has been verified.

4. isAnonymous: A boolean indicating whether the user is signed in anonymously.

5. metadata: Contains additional metadata about the user, such as the creation time and last sign-in time.
    creationTime: The date and time the user account was created.
    lastSignInTime: The date and time the user last signed in.

6. phoneNumber: The phone number of the user, if set.

7. photoURL: The URL of the user's profile picture, if set.

8. providerData: An array of provider-specific information objects for the user.

9. providerId: The provider identifier (e.g., "firebase").

10. refreshToken: A refresh token for the user account.

11. tenantId: The tenant ID associated with the user, if using multi-tenancy.

12. uid: The unique identifier for the user. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

//Milyen metódusai vannak, fontos, hogy itt kell a then meg a catch egy callback-vel, mert ez egy async folyamat 
//1. delete 
user.delete().then(() => {
  console.log('User deleted');
}).catch((error) => {
  console.error('Error deleting user:', error);
});

//2. getIdToken 
user.getIdToken(/* forceRefresh */ true).then((idToken) => { //ha a forceRefresh true, akkor a token refreshed!!! 
  console.log('ID Token:', idToken);
}).catch((error) => {
  console.error('Error getting ID Token:', error);
});

//3. getTokenResult 
user.getIdTokenResult(/* forceRefresh */ true).then((idTokenResult) => {
  console.log('ID Token Result:', idTokenResult);
}).catch((error) => {
  console.error('Error getting ID Token Result:', error);
});

//4. linkWithCredentials 
//links the user account with the given credentials 
const credential = firebase.auth.EmailAuthProvider.credential(email, password);
user.linkWithCredential(credential).then((userCredential) => {
  console.log('Account linking success', userCredential);
}).catch((error) => {
  console.error('Error linking account:', error);
});

//5. linkWithPhoneNumber(phoneNumber, applicationVerifier)
user.linkWithPhoneNumber(phoneNumber, applicationVerifier).then((confirmationResult) => {
  // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
}).catch((error) => {
  console.error('Error linking phone number:', error);
});


//6. reauthenticateWirhCredentials(credential) reauthenticates the user with given credentials
const credential1 = firebase.auth.EmailAuthProvider.credential(email, password);
user.reauthenticateWithCredential(credential).then(() => {
  console.log('User re-authenticated');
}).catch((error) => {
  console.error('Error re-authenticating user:', error);
});


//7. reload() Reloads the user data from the server
user.reload().then(()=> {
  console.log('User reloaded')
}).catch((error)=> {
  console.log('Error reloading user', error);
}) 


//8. sendEmailVerification(actionCodeSettings) Sends a verification for the user
user.sendEmailVerification().then(() => {
  console.log('Email verification sent');
}).catch((error) => {
  console.error('Error sending email verification:', error);
});


//9. unlink(providerId) Unlinks the iser account from the given provider
user.unlink(providerId).then((result) => {
  console.log('Account unlinked', result);
}).catch((error) => {
  console.error('Error unlinking account:', error);
});



//10. updateEmail(newEmail)
user.updateEmail(newEmail).then(() => {
  console.log('Email updated');
}).catch((error) => {
  console.error('Error updating email:', error);
});


//11. updatePassword(newPassword)
user.updatePassword(newPassword).then(() => {
  console.log('Password updated');
}).catch((error) => {
  console.error('Error updating password:', error);
});


//12. updatePhoneNumber(phoneCredentials)
user.updatePhoneNumber(phoneCredential).then(() => {
  console.log('Phone number updated');
}).catch((error) => {
  console.error('Error updating phone number:', error);
});


//13. updateProfile(profile)
user.updateProfile({
  displayName: "New Name",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  console.log('Profile updated');
}).catch((error) => {
  console.error('Error updating profile:', error);
});

//14. linkWithPopup(provider) Links the user with the given provider using a popup-based OAuth flow
const provider = new firebase.auth.GoogleAuthProvider();
user.linkWithPopup(provider).then((result) => {
  console.log('Account linking success', result);
}).catch((error) => {
  console.error('Error linking account:', error);
});

/*********************************************************************************************************************************************
Nagyon fontos, mikor kapjuk meg ezt a user objektumot!!!!! 
4 eset, amugy meg az auth-ból származtatott objektum! 
1. OnAuthStateChanged, amit csináktunk mi is a settings-ben!!!! 
*/
import { onAuthStateChanged } from "firebase/auth";

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:", user);
            // User is signed in, you can access user properties here
        } else {
            console.log("No user is signed in.");
            // No user is signed in
        }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
}, []);

//2. miután bejelentkezik a user 
import { signInWithEmailAndPassword } from "firebase/auth";

const signIn1 = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in:", user);
        // User is signed in, you can access user properties here
    } catch (error) {
        console.error("Error signing in:", error);
    }
};

//3. miután beregisztrált a user 
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed up:", user);
        // User is signed up, you can access user properties here
    } catch (error) {
        console.error("Error signing up:", error);
    }
};

// 4. Accessing the current user
import { getAuth } from "firebase/auth";

const auth = getAuth();
const currentUser = auth.currentUser;

if (currentUser) {
    console.log("Current user:", currentUser);
    // User is signed in, you can access user properties here
} else {
    console.log("No user is currently signed in.");
}

/*
***********************************************************************************************************************
Mi a különbség az auth az auth.currentUser között 

Key Differences Between auth and auth.currentUser

auth Object:

Represents the entire Firebase authentication instance.

Includes methods for managing user authentication, such as signIn, signOut, createUserWithEmailAndPassword, onAuthStateChanged, and more.

Maintains the state and configuration for authentication.

Required for methods that operate on the authentication session as a whole, like signOut.

auth.currentUser:

Represents the currently signed-in user.

Provides properties and methods specific to the signed-in user, such as uid, email, displayName, getIdToken, updateProfile, etc.

Does not include methods that affect the overall authentication state, like signOut.
*/

const logOut = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};








