export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'createPost' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'getPost' : IDL.Func([IDL.Nat], [IDL.Opt(Post)], ['query']),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
