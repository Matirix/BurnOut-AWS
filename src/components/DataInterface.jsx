// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore,
    query,
    orderBy,
    onSnapshot,
    collection,
    getDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    doc, 
    serverTimestamp, 
    arrayUnion
} from "firebase/firestore";
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
const analytics = getAnalytics(app);


// Authentication functions
export const authenticateWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

export const authenticateWithEmail = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
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
    }).then((newApplicationRef) => {
        console.log("Document written with ID: ", newApplicationRef.id);
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
    }).then(() => {
        console.log("Document successfully updated!");
    }
    ).catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export const getApplications = () => {
    const applicationsColRef = collection(db, "applications");
    const applicationsQuery = query(applicationsColRef, orderBy("dateApplied", "desc"));
    return onSnapshot(applicationsQuery, (querySnapshot) => {
        const applications = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            applications.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return applications;
    });
}

export const getCommunityApplications = (communityID) => {
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
        return applications;
    });
}

export const streamCommunityApplications = (communityID, callback) => {
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
    const userRef = doc(db, "users", user.id);
    return setDoc(userRef, {
        email: user.email,
        userName: user.userName,
        communityID: user.communityID,
    }).then(() => {
        console.log("Document successfully written!");
    }
    ).catch((error) => {
        console.error("Error writing document: ", error);
    }
    );
}

export const updateUser = (user) => {
    const userRef = doc(db, "users", user.id);
    return updateDoc(userRef, {
        email: user.email,
        userName: user.userName,
        communityID: user.communityID,
    }).then(() => {
        console.log("Document successfully updated!");
    }
    ).catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export const getUser = (userId) => {
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
    });
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