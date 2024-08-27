import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Time "mo:base/Time";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  type Post = {
    id: Nat;
    title: Text;
    content: Text;
    timestamp: Int;
  };

  stable var nextPostId: Nat = 0;
  let posts = HashMap.HashMap<Nat, Post>(0, Nat.equal, Nat.hash);

  public func createPost(title: Text, content: Text) : async Nat {
    let id = nextPostId;
    let timestamp = Time.now();
    let post: Post = {
      id;
      title;
      content;
      timestamp;
    };
    posts.put(id, post);
    nextPostId += 1;
    id
  };

  public query func getPosts() : async [Post] {
    Iter.toArray(posts.vals())
  };

  public query func getPost(id: Nat) : async ?Post {
    posts.get(id)
  };
}
