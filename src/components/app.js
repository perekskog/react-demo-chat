import { useRef, useCallback } from "react";
let messages = [
  { "id": 1, "sender": "left", "message": "a" },
  { "id": 2, "sender": "right", "message": "b" },
  { "id": 3, "sender": "left", "message": "b" }
];

const Message = (props) => (
  <div className={props.sender === "left" ? "message message-left" : "message message-right"}>
    {props.text}
  </div>
)

const MessageInputRef = (props) => {
  const messageElement = useRef();

  const formHandler = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Submit:", messageElement.current?.value)
      const l = messages.length;
      messages = [...messages, { "id": l, "sender": props.sender, "message": messageElement.current?.value }]
      console.log(messages);
    })
  return (
    <form onSubmit={formHandler}>
      <input ref={messageElement} type="text" />
      <button type="submit">Send</button>
    </form>
  )
}

const App = () => (
  <>
    <div>
      {messages.map((m) => (<Message key={m.id} sender={m.sender} text={m.message} />))}
    </div>
    <div><MessageInputRef sender="left" /></div>
  </>
)

export { App }
