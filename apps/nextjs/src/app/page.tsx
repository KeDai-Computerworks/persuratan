import { CreatePostForm, PostList } from "./_components/posts";

export default function HomePage() {
  return (
    <main className="container mx-auto my-10">
      <CreatePostForm />
      <PostList />
    </main>
  );
}
