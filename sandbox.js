// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe, id) => {
    let html = `
        <li data-id="${id}">
            <div>${recipe.title}</div>
            <div>${recipe.created_at.toDate()}</div>
            <button class="btn btn-danger btn-sm my-2">delete</button>
        </li>
    `;
    list.innerHTML += html;
};

// get documents
db.collection('recipes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        addRecipe(doc.data(), doc.id);
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

// deleting document
list.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete().then(() => {
            console.log('recipe deleted')
        }).catch(err => {
            console.log(err);
        });        
    }
});