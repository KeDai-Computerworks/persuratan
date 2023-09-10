import { Alert } from "@acme/ui/components/ui/alert";
import { Button } from "@acme/ui/components/ui/button";

import { CreatePostForm, PostList } from "./_components/posts";

export default function HomePage() {
  return (
    <main className="container mx-auto my-10">
      <Alert>dsds</Alert>
      <Button variant={"destructive"}>dsdsd</Button>
      {/* <pre className="mt-8">
        {JSON.stringify(resolvedConfig.presets, null, 2)}
      </pre> */}
      <CreatePostForm />
      <PostList />
    </main>
  );
}
