import React, { useState } from 'react';

// function DiscussionBoard() {
//   const [postContent, setPostContent] = useState('');

//   const handlePostContentChange = (event) => {
//     setPostContent(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle submission logic here
//     console.log('Submitted:', postContent);
//     // Clear post content after submission
//     setPostContent('');
//   };

//   return (
//     <main>
//       <section className="discussion">
//         <h2>Discussion Board</h2>
//         <div className="discussion-posts">
//           {/* Discussion posts will be dynamically added here */}
//         </div>
//         <form className="new-post-form" onSubmit={handleSubmit}>
//           <textarea
//             name="postContent"
//             id="postContent"
//             value={postContent}
//             onChange={handlePostContentChange}
//             placeholder="Write your post here..."
//           ></textarea>
//           <button type="submit">Post</button>
//         </form>
//       </section>
//     </main>
//   );
// }

function DiscussionBoard() {
  return (
    <main>
        <section class="discussion">
            <h2>Discussion Board</h2>
            <div class="discussion-posts">
            </div>
            <form class="new-post-form"  action="Post">
                <textarea name="postContent" id="postContent" placeholder="Write your post here..."></textarea>
                <button type="submit">Post</button>
            </form>
        </section>
    </main>
  );
}

export default DiscussionBoard;
