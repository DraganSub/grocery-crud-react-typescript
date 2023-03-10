import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { IGroceries, IGroceryList } from "../types";
import { LocalStorageHandler } from "../utils/localStorageHandler";
import { Button } from "./buttons";
import { FormInputField } from "./inputs";

interface IGroceriesListMain {
  setGroceries: (value: any) => void,
  groceries: any
}

export default function GroceriesList(props: IGroceriesListMain) {
  const {
    setGroceries,
    groceries
  } = props;

  const groceriesFromLs = LocalStorageHandler.getFromLocalStorage("groceries");

  useEffect(() => {
    if (groceriesFromLs !== null) {
      const parsedDataFromLS = JSON.parse(groceriesFromLs);
      setGroceries(parsedDataFromLS)
    }
  }, [groceriesFromLs]) //eslint-disable-line

  const clearAllFromLocalStorage = () => {
    LocalStorageHandler.removeFromLocalStorage("groceries");
    setGroceries([]);
  }

  const methods = useForm<IGroceryList[]>({ mode: "onChange" });

  if (groceries === null) {
    return null;
  }
  return (
    <div>

      <>
        <div className="flex-container">
          <h1>Grocery List</h1>
          <FormProvider {...methods}>
            {groceries?.length === 0 ?
              <EmptyComponent />
              :
              <Groceries
                clearAllFromLocalStorage={clearAllFromLocalStorage}
                groceries={groceries}
                setGroceries={setGroceries}
              />
            }
          </FormProvider>
        </div>
      </>


    </div>
  )
}


const Groceries = (props: IGroceries) => {
  const {
    groceries,
    clearAllFromLocalStorage,
    setGroceries
  } = props;
  const {
    setValue,
    handleSubmit,
    reset
  } = useFormContext<IGroceryList>();

  const [activeGrocery, setActiveGrocery] = useState<string | null>(null)

  if (groceries == null || Object.keys(groceries)?.length == 0) { // eslint-disable-line
    return null
  }

  const toggleEditState = (id: string) => {
    const newData = groceries.filter((item: IGroceryList) => {
      return item.id === id
    })
    setActiveGrocery(id)

    // set active values with react hook form
    setValue("groceryName", newData[0].groceryName);
    setValue("quantity", newData[0].quantity);
    setValue("id", newData[0].id);
    setValue("price", newData[0].price)
  }

  const handleEdit = (data: IGroceryList) => {
    const newData = groceries.map((item: IGroceryList) => {
      if (data.id === item.id) {
        item["groceryName"] = data.groceryName;
        item["id"] = data.id;
        item["quantity"] = data.quantity
        item["price"] = data.price;
        return item;
      }
      return item;
    })
    setGroceries(newData);
    LocalStorageHandler.setLocalStorage("groceries", newData)
    setActiveGrocery(null)
    reset();
  }

  const handleDelete = (id: string) => {
    const newData = groceries.filter((item: IGroceryList) =>
      item.id !== id
    )
    setGroceries(newData);
    LocalStorageHandler.setLocalStorage("groceries", newData)
  }

  return (
    <div className="grocery-list">
      {groceries.map((item: IGroceryList) => {
        return (
          <React.Fragment key={item.id}>
            <div className="flex-list" >
              {item.id !== activeGrocery ?
                (<>
                  <div>
                    <p>Grocery Name: {item.groceryName} <span className="small-text">(${item.price})</span></p>
                    <span>Quantity: {item.quantity}</span>
                  </div>
                  <div className="flex-buttons">
                    <Button
                      className="btn btn--primary"
                      onClick={() => toggleEditState(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn btn--delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
                ) : (
                  <form className="form" onSubmit={handleSubmit(handleEdit)} >
                    <div className="edit-active">
                      <FormInputField
                        name="groceryName"
                        label="Grocery Name :"
                        className="input"
                        placeholder="GroceryName"
                        validate={(item: any) => item !== "" || "This field can't be empty! "}
                      />
                      <FormInputField
                        name="quantity"
                        label="Quantity :"
                        placeholder="Quantity"
                        className="input"
                        type="number"
                        validate={(item: any) => item !== "" || "This field can't be empty! "}
                      />
                      <FormInputField
                        name="price"
                        label="Price :"
                        placeholder="Price"
                        className="input"
                        type="number"
                        validate={(item: any) => item !== "" || "This field can't be empty! "}
                      />
                    </div>
                    <div className="flex-buttons">
                      <Button
                        type="submit"
                        className="btn btn--primary"
                        onClick={() => setActiveGrocery(item.id)}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        className="btn btn--delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </form>
                )
              }
            </div>
            < hr />
          </React.Fragment>
        )
      })}
      <Button className="btn btn--delete" onClick={clearAllFromLocalStorage}>
        Clear all
      </Button>
    </div >
  )
}

const EmptyComponent = () => {
  return (
    <div>
      List Is Empty
    </div>
  )
}

