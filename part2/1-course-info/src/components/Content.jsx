import Part from "./Part.jsx";

const Content = ({parts}) =>
    <div>
            {parts.map(part =>
                <div key={part.id}>
                    {<Part part={part}/>}
                    <br/>
                </div>
            )}
    </div>


export default Content;