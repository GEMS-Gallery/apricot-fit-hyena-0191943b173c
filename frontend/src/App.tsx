import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { backend } from 'declarations/backend';

type Post = {
  id: bigint;
  title: string;
  content: string;
  timestamp: bigint;
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={Number(post.id)} className="post-item">
            <Link to={`/post/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PostDetail = ({ id }: { id: string }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await backend.getPost(BigInt(id));
      if (fetchedPost) {
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <pre className="post-content">{post.content}</pre>
    </div>
  );
};

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await backend.createPost(title, content);
    setTitle('');
    setContent('');
    alert('Post created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

const App = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>
          Hacker-style Blog <span className="blinking-cursor">_</span>
        </h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create">Create Post</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail id="" />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </div>
  );
};

export default App;
