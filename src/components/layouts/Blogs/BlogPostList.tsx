import BlogCard from "./BlogCard";
import type { Post } from "./blogData";

export function BlogPostList({ posts }: { posts: Post[] }) {
    return (
        <div className="py-32 bg-primary-light/10">
            <div className="container-xl flex gap-12">

                {posts.map((post, index) => (
                <BlogCard
                    key={post.id}
                    index={index}
                    category={post.category}
                    title={post.title}
                    date={post.date}
                    excerpt={post.excerpt}
                    imageUrl={post.imageUrl}
                    onReadMore={() => console.log(`Read more: ${post.id}`)}
                />
                ))}
            </div>
        </div>
    );
}