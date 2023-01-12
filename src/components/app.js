import { useRef, useState, useCallback, useEffect } from "react";
import axios from "axios"

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

  const [message, setMessage] = useState("")

  const formHandler = useCallback(
    (event) => {
      event.preventDefault();
      console.log("SubmitState:", message)
      appendMessage({ "text": message })
      setMessage("")
    }, [appendMessage, message]
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

  const messageElement = useRef();

  const formHandler = useCallback(
    (event) => {
      event.preventDefault();
      console.log("SubmitRef:", messageElement.current?.value)
      appendMessage({ "text": messageElement.current?.value })
      messageElement.current.value = ""
    }, [appendMessage])

  return (
    <form onSubmit={formHandler}>
      <input ref={messageElement} type="text" />
      <button type="submit">Send</button>
    </form>
  )
}

const detectIntent = async (message) => {
  try {
    const response = await axios
      .post('http://localhost:4242/detectIntent', message);
    return response
  } catch (error) {
    console.log(error)
  }
}

const App = () => {
  console.log("###App refreshing")

  const [messages, setMessages] = useState([
  ]);
  const [message, setMessage] = useState();

  useEffect(() => {
    const getMessage = async () => {
      const res = await axios
        .get('http://localhost:4242/message');
      setMessage(() => res.data.messageOfTheDay);
    }

    getMessage();
  }, [message])

  const appendMessage = (message) => {
    detectIntent(message)
      .then((response) => {
        console.log(JSON.stringify(response))
        const l = messages.length;
        setMessages(messages => {
          return [...messages, { "id": l + 1, "sender": "left", "message": message.text }]
        });
        setMessages(messages => {
          return [...messages, { "id": l + 2, "sender": "right", "message": response.data.fullfilment }]
        });
      })
  }

  return (
    <>
      <div>Message of the day: {message}</div>
      <div>
        <MessageList messages={messages} />
      </div>
      <div><MessageInputRef appendMessage={appendMessage} /></div>
      <div><MessageInputState appendMessage={appendMessage} /></div>
    </>
  )
}

export { App }
