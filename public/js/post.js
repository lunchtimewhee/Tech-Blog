
// Comment submit event handler
const commentSubmit = async () => {

    // Get the id of the current post from URL
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Get the comment box text
    const content = document.querySelector('.textarea').value;


    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ content, postId, username }),
        headers: { 'Content-Type': 'application/json' }
    });


}

// Add event handler to submit button
document
  .querySelector('.submitButton')
  .addEventListener('click', commentSubmit);

