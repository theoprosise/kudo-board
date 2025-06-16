import React, {useState, useEffect} from "react";
import "./CommentModal.css"
import{
    fetchComments,
    createComment,
} from "../api";


export default function CommentModal({
    card, boardId, onClose, onCommentAdded
}) {
    const [comments, setComments] = useState([]);
    const[ body, setBody] = useState('');
    const [author, setAuthor] = useState('');

    const load = async () => {
        const data = await fetchComments( boardId, card.card_id );
        setComments(data);
      };
    
      useEffect(() => {
        load();
      }, []);
    
      const submit = async e =>{
        e.preventDefault();
        await createComment(boardId, card.card_id, {
            message: body, author
        });
        setBody('');
        setAuthor('');
        load();
        onCommentAdded();
      };
    
      return (
        <div className="modal-backdrop">
            <div className="modal">
                <button className="close" onClick={onClose}>CLOSE</button>
                <h2>{card.message}</h2>
                <img src={card.gif} alt="Card GIF" />
                <div className="comments-list">
                    {comments.map(c=>(
                        <div key={c.id} className="comment">
                            <p>{c.message}</p>
                            {c.author && <small>- {c.author}</small>}
                            </div>
                    ))}
                </div>
                <form onSubmit={submit} className="new-comment-form">
                    <input required placeholder="Add comment here" value={body} onChange={e => setBody(e.target.value)} />
                        <input placeholder="Author (optional)" value={author} onChange={e => setAuthor(e.target.value)} />
                        <button type="submit">Post Comment</button>
                </form>
            </div>
        </div>
      );
    }
    