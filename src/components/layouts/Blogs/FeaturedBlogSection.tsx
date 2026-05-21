import BlogCardFeatured from "./BlogCardFeatured";
import type { Post } from "./blogData";

export function FeaturedBlogSection({ data }: { data: Post[] }) {
    const featuredPost = data[0];

    return (
        <div className="container-xl flex flex-col gap-12 mb-32">
            <BlogCardFeatured
                key={featuredPost.id}
                category={featuredPost.category}
                title={featuredPost.title}
                excerpt={featuredPost.excerpt}
                imageUrl={featuredPost.imageUrl}
                onReadMore={() => console.log(`Read more: ${featuredPost.id}`)}
            />
        </div>
    );
}