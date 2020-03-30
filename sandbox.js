// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = recipe => {
    let html = `
        <li>
            <div>${recipe.title}</div>
            <div>${recipe.created_at.toDate()}</div>
        </li>
    `;
    list.innerHTML += html;
};

// get documents
db.collection('recipes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        addRecipe(doc.data());
    }); 
}).catch(err => {
    console.log(err);
});

// add documents
form.addEventListener('submit', e => {
    e.preventDefault();
    
    const now = new Date();
    const recipe = {
        title: form.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    }

    db.collection('recipes').add(recipe).then(() => {
        console.log('recipe added');
    }).catch(err => {
        console.log(err);
    });
});