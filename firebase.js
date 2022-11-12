
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
  import { getFirestore, addDoc, collection,getDocs,setDoc,doc,deleteDoc } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCk-hhTNVeVX7b8jj28UY_9ldek68xmSqc",
    authDomain: "mini-hackathone-77c8d.firebaseapp.com",
    projectId: "mini-hackathone-77c8d",
    storageBucket: "mini-hackathone-77c8d.appspot.com",
    messagingSenderId: "686093398549",
    appId: "1:686093398549:web:c3f429b539ec9df625141c"
  };

 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);



function firebaseSignIn(email,password){
    return signInWithEmailAndPassword(auth, email, password)
}

// ad class info to db
function adClassToDb(classInfo){
    return addDoc(collection(db,'classes'), classInfo)
}

// get class db 
async function getClassFromFirebase(){
    const querySnapshot = await getDocs(collection(db, 'classes'))
    const allClass = []
    
    querySnapshot.forEach((doc)=>{
    allClass.push({id: doc.id, ...doc.data()})
    });
    return allClass
}

// update perticular class
async function updateClassFromFirebase(classId, updateValuesObj){

    await setDoc(doc(db, "classes", classId), updateValuesObj
      );
}
// delete perticular class

async function deleteClassFromFirebase(classID){
    await deleteDoc(doc(db, "classes", classID));
}

export{firebaseSignIn,adClassToDb, getClassFromFirebase, updateClassFromFirebase, deleteClassFromFirebase}