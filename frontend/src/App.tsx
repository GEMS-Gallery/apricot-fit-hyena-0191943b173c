import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Container, Typography, List, ListItem, TextField, Button, Paper } from '@mui/material';

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
    <Container>
      <Typography variant="h4" gutterBottom className="terminal-prompt">
        Posts
      </Typography>
      <List className="post-list">
        {posts.map((post) => (
          <ListItem key={Number(post.id)} className="post-item">
            <Link to={`/post/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
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

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="terminal-prompt">
        {post.title}
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#000000', color: '#00ff00' }}>
        <pre className="post-content">{post.content}</pre>
      </Paper>
    </Container>
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
    <Container>
      <Typography variant="h4" gutterBottom className="terminal-prompt">
        Create Post
      </Typography>
      <form onSubmit={handleSubmit} className="create-post-form">
        <TextField
          fullWidth
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </form>
    </Container>
  );
};

const App = () => {
  return (
    <Container className="container">
      <header className="header">
        <Typography variant="h2" gutterBottom>
          Hacker-style Blog v0 <span className="blinking-cursor">_</span>
        </Typography>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create">Create Post</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail id="" />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Container>
  );
};

export default App;
