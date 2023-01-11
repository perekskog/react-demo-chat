const messages = [
  { "id": 1, "sender": "left", "message": "a" },
  { "id": 2, "sender": "right", "message": "b" },
  { "id": 3, "sender": "left", "message": "b" }
];

const Message = (props) => (
  <div className={props.sender === "left" ? "message message-left" : "message message-right"}>
    {props.text}
  </div>
)

const App = () => (
  <>
    {messages.map((m) => (<Message key={m.id} sender={m.sender} text={m.message} />))}
  </>
)

export { App }
