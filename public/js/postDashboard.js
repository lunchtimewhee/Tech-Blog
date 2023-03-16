
const titleInput = document.getElementById('newTitle');
const contentInput = document.getElementById('newContent');
const updateStatus = document.getElementById('updateSaved')


// Comment submit event handler
const commentEdit = async () => {

    // Get the id of the current post from URL
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Get the comment box text
    const title = titleInput.value;
    const content = contentInput.value;

    const response = await fetch('/api/post/' + postId, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    console.log(response);
    updateStatus.classList.remove('is-hidden');

}

// Comment submit event handler
const commentDelete = async () => {

    // Get the id of the current post from URL
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/post/' + postId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    
    console.log(response);
    window.location.replace('/dashboard');

}

// Add event handler to submit button
document
  .getElementById('submitButton')
  .addEventListener('click', commentEdit);

// Add event handler to delete button
document
.getElementById('deleteButton')
.addEventListener('click', commentDelete);

