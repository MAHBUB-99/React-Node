import { useState } from "react";

function App() {
  const [visible,setVisible] = useState(true)
	return (
		<div>
      {visible &&  
			<p id="my-paragraph">This is the paragraph you can toggle.</p>
      }

			<button id="toggle-btn" onClick={()=>{setVisible(visible === true ? false : true)}}>Toggle Paragraph</button>
		</div>
	);
}

export default App;
