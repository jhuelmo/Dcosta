import BlogCard from "./BlogCard";
import type { BlogCardViewModel } from "./blogCardViewModel";

export function BlogPostList({ posts }: { posts: BlogCardViewModel[] }) {
    return (
        <div className="py-32 bg-primary-light/10">
            <div className="container-xl px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

                {posts.map((post, index) => (
                <BlogCard
                    key={post.id}
                    index={index}
                    category={post.category}
                    title={post.title}
                    date={post.date}
                    excerpt={post.excerpt}
                    imageUrl={post.imageUrl}
                    href={post.href}
                />
                ))}
            </div>
        </div>
    );
}