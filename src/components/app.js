import { useRef, useState, useCallback } from "react";

const Message = (props) => {
  console.log("###Message refreshing")

  return (
    < div className={props.sender === "left" ? "message message-left" : "message message-right"} >
      {props.text}
    </div >
  )
}

const MessageList = (props) => {
  console.log("###MessageList refreshing")

  const messages = props.messages;

  return (messages.map((m) => (<Message key={m.id} sender={m.sender} text={m.message} />)))
}

const MessageInputState = (props) => {
  console.log("###MessageInputState refreshing")

  const appendMessage = props.appendMessage;
  const sender = props.sender;

  const [message, setMessage] = useState("")

  const formHandler = useCallback(
    (event) => {
      event.preventDefault();
      console.log("SubmitState:", message)
      appendMessage({ "sender": sender, "text": message })
      setMessage("")
    }, [appendMessage, message, sender]
  )
  return (
    <form onSubmit={formHandler}>
      <input value={message} type="text" onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  )
}

const MessageInputRef = (props) => {
  console.log("###MessageInputRef refreshing")

  const appendMessage = props.appendMessage;
  const sender = props.sender;

  const messageElement = useRef();

  const formHandler = useCallback(
    (event) => {
      event.preventDefault();
      console.log("SubmitRef:", messageElement.current?.value)
      appendMessage({ "sender": sender, "text": messageElement.current?.value })
      messageElement.current.value = ""
    }, [appendMessage, sender])

  return (
    <form onSubmit={formHandler}>
      <input ref={messageElement} type="text" />
      <button type="submit">Send</button>
    </form>
  )
}

const App = () => {
  console.log("###App refreshing")

  const [messages, setMessages] = useState([
    { "id": 1, "sender": "left", "message": "a" },
    { "id": 2, "sender": "right", "message": "b" },
    { "id": 3, "sender": "left", "message": "c yu ii" }
  ]);

  const appendMessage = (message) => {
    const l = messages.length;
    setMessages(messages => {
      return [...messages, { "id": l + 1, "sender": message.sender, "message": message.text }]
    })
  }
  return (
    <>
      <div>
        <MessageList messages={messages} />
      </div>
      <div><MessageInputRef sender="left" appendMessage={appendMessage} /></div>
      <div><MessageInputState sender="right" appendMessage={appendMessage} /></div>
    </>
  )
}

export { App }
