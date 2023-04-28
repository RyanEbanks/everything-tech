// Comment form handler
const commentFormHandler = async (event) => {
    // Prevent Reload
    event.preventDefault();
  
    const commentBody = document.querySelector('textarea[name="body"]').value.trim();
    const postId = document.querySelector('input[name="post-id"]').value;
  
    if (commentBody && postId) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ body: commentBody, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const post = await response.json();

        // Get the comments container and clear its contents
        const commentsContainer = document.querySelector('.comments-container');
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
    } else {
        alert('Failed to create comment');
      }
    }
  };
  
  document.querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
  