import { marked } from 'marked';

interface Props {
  content: string;
}

export default function RichText({ content }: Props) {
  const html = marked(content) as string;
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}