import BlogCardFeatured from "./BlogCardFeatured";
import type { BlogCardViewModel } from "./blogCardViewModel";

export function FeaturedBlogSection({ data }: { data: BlogCardViewModel[] }) {
    const featuredPost = data[0];

    if (!featuredPost) return null;

    return (
        <div className="container-xl px-4 lg:px-8 flex flex-col gap-12 mb-32">
            <BlogCardFeatured
                key={featuredPost.id}
                category={featuredPost.category}
                title={featuredPost.title}
                excerpt={featuredPost.excerpt}
                imageUrl={featuredPost.imageUrl}
                href={featuredPost.href}
            />
        </div>
    );
}