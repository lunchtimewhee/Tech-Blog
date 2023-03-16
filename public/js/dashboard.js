
const titleInput = document.getElementById('newTitle');
const contentInput = document.getElementById('newContent');

// Comment submit event handler
const commentSubmit = async () => {
   
    // Get the comment box text
    const title = titleInput.value;
    const content = contentInput.value;


    // If title or content are empty, don't allow user to post
    if(!title) {
        return;
    }

    if(!content) {
        return;
    }

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    });

    // Clear comment field
    titleInput.value = '';
    contentInput.value = '';
    location.reload();

}

// Add event handler to submit button
document
  .querySelector('.submitButton')
  .addEventListener('click', commentSubmit);

