

export default function Todoo(props) {
    const { todoo, setTodoos } = props;

    const updateTodoo = async (todooId, todooStatus) => {
        const res = await fetch(`/api/todoos/${todooId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todooStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodoos(
                currentTodoos => {
                    return currentTodoos.map((currentTodoo) => {
                        if (currentTodoo._id === todooId) {
                            return { ...currentTodoo, status: !currentTodoo.status }
                        }
                        return currentTodoo;
                    });
                });
        }
    };

    const deleteTodoo=async(todooId)=>{
        const res = await fetch(`/api/todoos/${todooId}`, {
            method:"DELETE"
        });
        const json= await res.json();
        if (json.acknowledged){
            setTodoos(currentTodoos=>{
                return currentTodoos.filter((currentTodoo)=>(currentTodoo._id !==todooId));
            })
        }
    };

    return (
        <div key={props.todoo._id} className="todo">
            <p>{props.todoo.todoo}</p>
            <div className="mutations">
                <button className="todo__status" onClick={() => updateTodoo(todoo._id, todoo.status)}>
                    {(todoo.status) ? "✅" : "🟩"}
                </button>
                <button className="todoo__delete" onClick={()=>deleteTodoo(todoo._id)}> 🗑️ </button>
            </div>

        </div>
    )
}