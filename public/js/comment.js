// Comment form handler
const commentFormHandler = async (event) => {
    // Prevent Reload
    event.preventDefault();
  
    const commentBody = document.querySelector('textarea[name="body"]').value.trim();
    const postId = document.querySelector('input[name="post-id"]').value;
    const userId = document.querySelector('input[name="user-id"]').value;

  
    if (commentBody && postId) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ body: commentBody, post_id: postId, user_id: userId }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log({ body: commentBody, post_id: postId, user_id: userId });

      if (response.ok) {
        const post = await response.json();
      
        // Get the comments container and clear its contents
        const commentsContainer = document.querySelector('.comments-container');
        if (commentsContainer) {
          commentsContainer.innerHTML = '';
      
          // Iterate through each comment in the post and add it to the comments container
          post.comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.innerHTML = `
              <div>
                <p>${comment.body}</p>
                <p>&mdash; ${comment.user.user_name}, ${format_date(comment.date_created)}</p>
              </div>
            `;
            commentsContainer.appendChild(commentEl);
          });
      
          // Clear the comment input field
          document.querySelector('textarea[name="body"]').value = '';
          //refresh the page
          document.location.reload();
        }
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  document.querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
  