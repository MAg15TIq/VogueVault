'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Comment {
  id: string;
  author: string;
  authorImage: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
}

interface CommentSectionProps {
  articleId: string;
  className?: string;
}

const CommentSection = ({ articleId, className = '' }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Load comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${articleId}`);
    const storedUserName = localStorage.getItem('user_name');
    
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
    
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    setIsLoading(false);
  }, [articleId]);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && comments.length > 0) {
      localStorage.setItem(`comments_${articleId}`, JSON.stringify(comments));
    }
  }, [comments, articleId, isLoading]);

  // Save username to localStorage whenever it changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem('user_name', userName);
    }
  }, [userName]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) {
      return;
    }
    
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: userName,
      authorImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`,
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
      isLiked: false,
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim() || !userName.trim()) {
      return;
    }
    
    const reply: Comment = {
      id: Date.now().toString(),
      author: userName,
      authorImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`,
      content: replyContent,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent('');
  };

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      // Handle liking a reply
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
    } else {
      // Handle liking a top-level comment
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <div className={`mt-12 ${className}`}>
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Your Comment
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800"
            placeholder="Share your thoughts..."
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="btn-glow px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Post Comment
        </button>
      </form>
      
      {/* Comments List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
          <p>Be the first to comment on this article!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-6">
              <div className="flex items-start">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                  <Image
                    src={comment.authorImage}
                    alt={comment.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{comment.author}</h4>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">{comment.content}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
                    >
                      {comment.isLiked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                      )}
                      {comment.likes} {comment.likes === 1 ? 'Like' : 'Likes'}
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Reply
                    </button>
                  </div>
                  
                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800"
                        placeholder="Write a reply..."
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-4 py-1 text-sm border border-neutral-200 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          className="px-4 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="pt-4">
                          <div className="flex items-start">
                            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                              <Image
                                src={reply.authorImage}
                                alt={reply.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">{reply.author}</h5>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {formatDate(reply.date)}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{reply.content}</p>
                              <div className="mt-2">
                                <button
                                  onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                  className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
                                >
                                  {reply.isLiked ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                  )}
                                  {reply.likes} {reply.likes === 1 ? 'Like' : 'Likes'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
