import CardItem from "./CardItem";
export default function CardGrid({
  cards,
  upvote,
  pin,
  delete: del,
  commentAdded,
}) {
  return (
    <div className="grid cards">
      {cards.map((c) => (
        <CardItem
          key={c.card_id}
          card={c}
          onUpvote={() => upvote(c.card_id)}
          onPin={() => pin(c.card_id)}
          onDelete={() => del(c.card_id)}
          onCommentAdded={commentAdded}
        />
      ))}
    </div>
  );
}
