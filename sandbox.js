// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');

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

const deleteRecipe = id => {
    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe => {
        if(recipe.getAttribute('data-id') === id){
            recipe.remove();
        }
    });
    console.log(recipes);
};

// get documents
const unsub = db.collection('recipes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
            addRecipe(change.doc.data(), change.doc.id);
        }else if(change.type === 'removed'){
            deleteRecipe(change.doc.id);
        }
    });
    console.log(snapshot.docChanges());
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

// unsub from database changes
button.addEventListener('click', e => {
    e.preventDefault();
    unsub();
    console.log('unsubscribed from collection changes');
});