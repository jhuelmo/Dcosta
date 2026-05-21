import Title from "@/components/ui/title";
import BlogCard from "./BlogCard";
import {blog} from "./blogData";
import { FeaturedBlogSection } from "./FeaturedBlogSection";
import { BlogPostList } from "./BlogPostList";

export default function BlogPage() {
  return (
    <section className=" flex flex-col gap-10 pt-56">
        <div className="container-xl title">
            <Title title="BLOG Y ARTICULOS" />
        </div>

        <FeaturedBlogSection data={blog}/>

        <BlogPostList posts={blog} />
        
    </section>
  );
}