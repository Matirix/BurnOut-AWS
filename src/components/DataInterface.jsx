// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Pool from "./UserPool";

import {
    getFirestore,
    query,
    where,
    orderBy,
    onSnapshot,
    collection,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    setDoc,
    serverTimestamp,
    arrayUnion,
    increment,
} from "firebase/firestore";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,

} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { data } from "autoprefixer";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYBu8QwRc-aYeUEO-ujSpkjeNaYND59eA",
    authDomain: "burnout-46863.firebaseapp.com",
    projectId: "burnout-46863",
    storageBucket: "burnout-46863.appspot.com",
    messagingSenderId: "931271712262",
    appId: "1:931271712262:web:a74316531ab7c9f01bed87",
    measurementId: "G-ZH4V70KW9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app);
const analytics = getAnalytics(app);


// Authentication functions
export const authenticateWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        addUser(result.user);
        return result.user;
    } catch (error) {
        console.log(error);
    }
}

export const authenticateWithEmail = (email, password) => {
    return signInWithEmailAndPassword(email, password);
}

export const isLoggedIn = () => {
    const user = Pool.getCurrentUser();
    if (user) {
        console.log("User is logged in");
        return true;
    } else {
        console.log("User is not logged in");
        return false;
    }
}

export const getUserID = () => {
    if (Pool.getCurrentUser()) {
        return Pool.getCurrentUser().username;
    } else {
        return null;
    }
    // const user = getAuth().currentUser;
    // if (user) {
    //     return user.uid;
    // } else {
    //     return null;
    // }
}

export const logout = () => {
    return signOut();
}

// Enums
export const ApplicationStatus = {
    Applied: 'Applied',
    Interviewing: 'Interviewing',
    Offer: 'Offer',
    Rejected: 'Rejected',
    Accepted: 'Accepted',
    NoResponse: 'No Response',
    Withdrawn: 'Withdrawn',
    Archived: 'Archived',
}

export const JobPositions = {
    SoftwareEngineer: 'Software Engineer',
    SoftwareDeveloper: 'Software Developer',
    SoftwareArchitect: 'Software Architect',
    SDET: 'SDET',
    FullStackEngineer: 'Full Stack Engineer',
    FullStackDeveloper: 'Full Stack Developer',
    FrontEndEngineer: 'Front End Engineer',
    FrontEndDeveloper: 'Front End Developer',
    BackEndEngineer: 'Back End Engineer',
    BackEndDeveloper: 'Back End Developer',
    QAEngineer: 'QA Engineer',
    QAAnalyst: 'QA Analyst',
    DataAnalyst: 'Data Analyst',
    DataScientist: 'Data Scientist',
    DataEngineer: 'Data Engineer',
    DataArchitect: 'Data Architect',
    DevOpsEngineer: 'DevOps Engineer',
    DevOpsArchitect: 'DevOps Architect',
    UIDesigner: 'UI Designer',
    UXDesigner: 'UX Designer',
    ProductManager: 'Product Manager',
    WebDesigner: 'Web Designer',
    WebDeveloper: 'Web Developer',
}


// data functions
export const createApplication = (applicationData) => {
    const applicationsColRef = collection(db, "applications");
    return addDoc(applicationsColRef, {
        companyName: applicationData.companyName,
        dateApplied: applicationData.dateApplied || new Date(),
        applicationStatus: applicationData.applicationStatus || ApplicationStatus.Applied,
        jobPosition: applicationData.jobPosition,
        comments: applicationData.comments,
        communityID: applicationData.communityID,
        userID: applicationData.userID,
        // username: applicationData.username,
    }).then((newApplicationRef) => {
        console.log("Document written with ID: ", newApplicationRef.id);
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export const createUser = async (userData) => {
    // const userColRef = collection(db, "users");
    console.log("creating user");
    console.log(userData.userName);
    const userColRef = doc(db, "users", userData.userName);
    return setDoc(userColRef, {
        userName: userData.userName,
        email: userData.email,
        rejectedAppCount: userData.rejectedAppCount,
        submittedAppCount: userData.submittedAppCount,
        communityID: userData.communityID,
    }).then(() => {
        console.log("new user document successfully created!");
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}



export const updateApplication = (applicationData) => {
    const applicationRef = doc(db, "applications", applicationData.id);
    return updateDoc(applicationRef, {
        companyName: applicationData.companyName,
        dateApplied: applicationData.dateApplied,
        applicationStatus: applicationData.applicationStatus,
        jobPosition: applicationData.jobPosition,
        comments: applicationData.comments,
        communityID: applicationData.communityID,
        userID: applicationData.userID,
    }).then(() => {
        console.log("Document successfully updated!");
    }
    ).catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export const getApplications = async (userID) => {
    const applicationsRet = [];
    const applicationsColRef = collection(db, "applications");
    const q = query(applicationsColRef, where("userID", "==", userID));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        applicationsRet.push(doc.data());
        //   console.log(doc.id, " => ", doc.data());
    });

    return applicationsRet;
};


export const getCommunityApplications = async (communityID = "0Km4CwF0nULxl1qtpyuB") => {
    const applicationsColRef = collection(db, "applications");
    const communityApplicationsQuery = query(applicationsColRef, where("communityID", "==", communityID), orderBy("dateApplied", "desc"));
  
    // use await to wait for the query snapshot to be retrieved
    const querySnapshot = await getDocs(communityApplicationsQuery);
    const applications = [];
  
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc)
      applications.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return applications;
  }

  export const getCommunityMembersRanking = async (communityID = "0Km4CwF0nULxl1qtpyuB") => {
    const applicationsColRef = collection(db, "users");
    const communityMembersRanking = query(applicationsColRef, where("communityID", "==", communityID), orderBy("submittedAppCount", "desc"));
  
    // use await to wait for the query snapshot to be retrieved
    const querySnapshot = await getDocs(communityMembersRanking);
    const applications = [];
  
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc)
      applications.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return applications;
  }

//     return onSnapshot(communityApplicationsQuery, (querySnapshot) => {
//         const applications = [];
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             applications.push({
//                 id: doc.id,
//                 ...doc.data()
//             });
//         });
//         return applications;
//     });
// }

export const streamCommunityApplications = (communityID, callback) => {
    // const userRef = doc(db, "users", getUserID());
    // const userDoc = collection(userRef, "applications");
    const applicationsColRef = collection(db, "applications");
    const communityApplicationsQuery = query(applicationsColRef, where("communityID", "==", communityID), orderBy("dateApplied", "desc"));
    return onSnapshot(communityApplicationsQuery, (querySnapshot) => {
        const applications = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            applications.push({
                id: doc.id,
                ...doc.data()
            });
        });
        callback(applications);
    });
}

export const deleteApplication = (applicationId) => {
    const applicationRef = doc(db, "applications", applicationId);
    return deleteDoc(applicationRef).then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// user functions
export const addUser = (user) => {
    // call this function after new user is created in firebase auth
    // pass in the user object(json/dict with email, username) and the userId
    const userRef = doc(db, "users", user.uid);
    return setDoc(userRef, {
        email: user.email,
        userName: user.displayName,
        communityID: user.communityID || "0Km4CwF0nULxl1qtpyuB",
        submittedAppCount: 0,
        rejectedAppCount: 0,
    }).then(() => {
        console.log("Document successfully written!");
    }
    ).catch((error) => {
        console.error("Error writing document: ", error);
    }
    );
}

export const incrementSubmittedAppCount = () => {
    const userId = getUserID();
    const userRef = doc(db, "users", userId);
    return updateDoc(userRef, {
        submittedAppCount: increment(1),
    }).then(() => {
        console.log("Document successfully updated!");
    }
    ).catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export const updateUser = (user) => {
    const userRef = doc(db, "users", getUserID());
    return updateDoc(userRef, {
        email: user.email,
        userName: user.userName,
        communityID: user.communityID || "0Km4CwF0nULxl1qtpyuB",
    }).then(() => {
        console.log("Document successfully updated!");
    }
    ).catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export const getUser = () => {
    const userId = getUserID();
    const userRef = doc(db, "users", userId);
    return getDoc(userRef).then((doc) => {
        if (doc.exists()) {
            return doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    }
    );
};

export const uploadUserImage = (image) => {
    var userId = getUserID();
    const storageRef = ref(storage, `users/${userId}/profileImage`);
    return uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}

export const getUserImage = async () => {
    // userID =     const user = Pool.getCurrentUser()
    const userID = getUserID();
    console.log(userID)
    if (userID === null) {
        return null;
    }
    // userID = user.username;
    // const storageRef = ref(storage, `users/${userID}/profileImage`);
    // return getDownloadURL(storageRef).then((url) => {
    //     return url;
    // }).catch((error) => {
    //     console.log(error);
    // });
    return "https://burnout-test.s3.us-west-2.amazonaws.com/" + userID 
}

// community functions
export const createCommunity = (communityData) => {
    const communitiesColRef = collection(db, "communities");
    return addDoc(communitiesColRef, {
        name: communityData.name,
        dateCreated: communityData.dateCreated || new Date(),
        members: communityData.members || [],
        applications: communityData.applications || [],
    }).then((newCommunityRef) => {
        console.log("Document written with ID: ", newCommunityRef.id);
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export const updateCommunity = (communityData) => {
    const communityRef = doc(db, "communities", communityData.id);
    return updateDoc(communityRef, {
        name: communityData.name,
        dateCreated: communityData.dateCreated,
        members: communityData.members,
        applications: communityData.applications,
    }).then(() => {
        console.log("Document successfully updated!");
    }
    ).catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export const getCommunity = (communityId) => {
    const communityRef = doc(db, "communities", communityId);
    return getDoc(communityRef).then((doc) => {
        if (doc.exists()) {
            return doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

