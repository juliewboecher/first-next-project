export default function PostPage({ params }) {
  const { slug } = params;

  return (
    <div className="page">
      <h1>Post: {slug}</h1>
    </div>
  );
}
