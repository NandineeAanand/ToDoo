import { useEffect, useState } from "react";
import Todoo from "./Todoo";

export default function App() {
  const [todoos, setTodoos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const getTodoos = async () => {
      const res = await fetch("/api/todoos");
      const todoos = await res.json();
      setTodoos(todoos);
    };
    getTodoos();
  }, []); // Dependency array empty - runs once only

  const createNewTodoo=async(e)=>{
    e.preventDefault();
    if(content.length>3)
    {
      const res=await fetch("/api/todoos",{
        method:"POST",
        body:JSON.stringify({todoo:content}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodoo=await res.json();

      setContent("");
      setTodoos([...todoos,newTodoo]);
    }
  }
  return (
    <main className="container">
      <h1 className="title">Awesome Todoos</h1>

      <form className="form" onSubmit={createNewTodoo}>
        <input type="text" value={content} onChange={(e)=> setContent(e.target.value)} placeholder="Enter a new todoo..." className="form__input" required/>
        <button type="submit">Create Todoo</button>
      </form>
      <div className="todos">
        {todoos.length > 0 &&
          todoos.map((todoo) => (
            <Todoo key={todoo._id} todoo={todoo} setTodoos={setTodoos}/>
          ))}
      </div>
    </main>
  );
}
 