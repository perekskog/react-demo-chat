import { useRef, useState, useCallback } from "react";

const Message = (props) => (
  <div className={props.sender === "left" ? "message message-left" : "message message-right"}>
    {props.text}
  </div>
)

const MessageList = (props) => {
  const messages = props.messages;

  return (messages.map((m) => (<Message key={m.id} sender={m.sender} text={m.message} />)))
}

const MessageInputRef = (props) => {
  const messageElement = useRef();

  const formHandler = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Submit:", messageElement.current?.value)
      props.appendMessage({ "sender": props.sender, "text": messageElement.current?.value })
    })
  return (
    <form onSubmit={formHandler}>
      <input ref={messageElement} type="text" />
      <button type="submit">Send</button>
    </form>
  )
}

const App = () => {
  const [messages, setMessages] = useState([
    { "id": 1, "sender": "left", "message": "a" },
    { "id": 2, "sender": "right", "message": "b" },
    { "id": 3, "sender": "left", "message": "c yu ii" }
  ]);
  const appendMessage = (message) => {
    const l = messages.length;
    const newMessages = [...messages, { "id": l + 1, "sender": message.sender, "message": message.text }]
    console.log(newMessages);
    setMessages(newMessages);
  }
  return (
    <>
      <div>
        <MessageList messages={messages} />
      </div>
      <div><MessageInputRef sender="left" appendMessage={appendMessage} /></div>
      <div><MessageInputRef sender="right" appendMessage={appendMessage} /></div>
    </>
  )
}

export { App }
