/*------------------------------------------
  CONTENT SCRIPT
------------------------------------------*/
import { createRoot } from "react-dom/client";

function renderRoot() {
  // Avoid inserting multiple times
  if (document.getElementById("__EXTENSION_HOLDER")) return;

  // Create outer container
  const container = document.createElement("div");
  container.id = "__EXTENSION_HOLDER";

  // Create inner root div for React
  const rootDiv = document.createElement("div");
  rootDiv.id = "__EXTENSION_ROOT";
  container.appendChild(rootDiv);

  // Append to body
  document.body.appendChild(container);

  // Render React content
  createRoot(rootDiv).render(<h1>Hello World</h1>);
}

renderRoot();
