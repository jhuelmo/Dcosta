import Title from "@/components/ui/title";
import type { Post } from "@/lib/strapi/types";
import { FeaturedBlogSection } from "./FeaturedBlogSection";
import { BlogPostList } from "./BlogPostList";
import { toCardViewModel } from "./blogCardViewModel";

export default function BlogPage({ posts }: { posts: Post[] }) {
  const cards = posts.map(toCardViewModel);

  return (
    <section className=" flex flex-col gap-10 pt-56">
        <div className="container-xl px-4 lg:px-8 title">
            <Title title="BLOG Y ARTICULOS" />
        </div>

        <FeaturedBlogSection data={cards}/>

        <BlogPostList posts={cards} />

    </section>
  );
}