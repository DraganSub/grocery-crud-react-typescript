import { useState } from "react";
import { AddBudgetField, AddGroceries, GroceriesList } from "./components"
import { IGroceryList } from "./types";


function App() {
  const [groceries, setGroceries] = useState<IGroceryList[]>([])
  const [isBudgetModalOppened, setIsBudgetModalOppened] = useState<boolean>(false);

  return (
    <div className="app">
      <header>
        <h1 className="title--center">Groceries App</h1>
      </header>
      <div className="main">
        <div className="container">
          <AddBudgetField
            groceries={groceries}
            isBudgetModalOppened={isBudgetModalOppened}
            setIsBudgetModalOppened={setIsBudgetModalOppened}
          />
        </div>
        <div className="container">
          <AddGroceries setGroceries={setGroceries} />
        </div>
        <div className="container">
          <GroceriesList setGroceries={setGroceries} groceries={groceries} />
        </div>
      </div>

    </div>
  );
}

export default App;
