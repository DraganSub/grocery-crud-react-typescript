import { FormProvider, useForm } from "react-hook-form";
import { IAddGroceries, IGroceryList } from "../types";
import { FormInputField } from "./inputs";
import { useContext, useId } from "react";
import { Button } from "./buttons";
import { LocalStorageHandler } from "../utils/localStorageHandler";
import { SuccessMessageCtx } from "../context/SuccessMessageCtx";

export default function AddGroceries(props: IAddGroceries) {
  const {
    setGroceries
  } = props;

  // userId 
  const randomId = useId();

  // react hook form
  const methods = useForm<IGroceryList[]>({ mode: "onChange" });
  const { handleSubmit, reset } = methods;

  // context for success message
  const { setMessage, setIsMessageActive } = useContext(SuccessMessageCtx)


  // add data to local storage
  const onSubmit = (data: IGroceryList[]) => {
    const modifiedData = { ...data, id: (randomId + (Math.random() * 10000)) }
    const localStorageData = LocalStorageHandler.getFromLocalStorage("groceries");

    if (localStorageData === null) {
      LocalStorageHandler.setLocalStorage("groceries", [{ ...modifiedData }])

      // set groceries
      setGroceries(LocalStorageHandler.setLocalStorage("groceries", [{ ...modifiedData }]))
    } else {
      const parsedLSData = JSON.parse(localStorageData);
      parsedLSData.push({ ...modifiedData });
      LocalStorageHandler.setLocalStorage("groceries", parsedLSData)

      // set groceries
      setGroceries(LocalStorageHandler.setLocalStorage("groceries", parsedLSData))
    }

    setIsMessageActive(true)
    setMessage("Your new grocery is successfuly added!");
    // reset form on initial values
    reset()
  }


  return (
    <>
      <div className="flex-container">
        <h1> Add Grocery</h1>
        <FormProvider {...methods}>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
              name="groceryName"
              label="Grocery Name"
              placeholder="GroceryName"
              validate={(item: any) => item !== "" || "This field can't be empty! "}
            />
            <FormInputField
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
              type="number"
              validate={(item: any) => item !== "" || "This field can't be empty! "}
            />
            <FormInputField
              name="price"
              label="Price"
              placeholder="Price"
              type="number"
              validate={(item: any) => item !== "" || "This field can't be empty! "}
            />
            <div className="flex-right">
              <Button
                type="submit"
                className="form--btn"
              >
                Add Grocery
          </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
