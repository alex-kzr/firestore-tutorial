// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const list = document.querySelector('ul');

const addRecipe = recipe => {
    let html = `
        <li>
            <div>${recipe.title}</div>
            <div>${recipe.created_at.toDate()}</div>
        </li>
    `;
    list.innerHTML += html;
};

db.collection('recipes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        addRecipe(doc.data());
    }); 
}).catch(err => {
    console.log(err);
});