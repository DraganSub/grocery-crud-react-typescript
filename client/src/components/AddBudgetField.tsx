import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Modal from "../portals/Modal";
import { IBudgetField, IBudgetModalData, IBudgetProps } from "../types";
import { Button } from "./buttons";
import { FormInputField } from "./inputs";


export default function AddBudgetField(props: IBudgetProps) {
  const {
    isBudgetModalOppened,
    setIsBudgetModalOppened,
    groceries
  } = props;

  // State
  const [modalData, setModalData] = useState<IBudgetModalData | null>(null);

  // React hook form 
  const methods = useForm<IBudgetField>({ mode: "onChange" });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: IBudgetField) => {
    const addedGroceriesAmmount = groceries.reduce((acc, curentValue) => Number(acc) + Number(curentValue.price * curentValue.quantity), 0)
    if (data.budget > addedGroceriesAmmount) {
      const newBudget = data.budget - addedGroceriesAmmount;
      setModalData({
        budgetAmmount: data.budget,
        remainingAmmount: newBudget,
        message: `Your remaining budget is ${newBudget} $`
      })
    } else {
      const currentBudget = data.budget - addedGroceriesAmmount;
      setModalData({
        budgetAmmount: data.budget,
        remainingAmmount: currentBudget,
        message: `Your budget is not enough, you need to add ${Math.abs(currentBudget)}$ to your budget`
      })
    }
    setIsBudgetModalOppened(true)

    // reset form values
    reset();
  }

  return (
    <div className="flex-container">
      {isBudgetModalOppened &&
        <Modal
          onClose={() => setIsBudgetModalOppened(false)}
        >
          <div className="flex-container">
            {modalData?.remainingAmmount! > 0 ?
              (
                <>
                  <h2>Your budget: <span className="blue-font">{modalData?.budgetAmmount}$</span></h2>
                  <h3>Remaining Ammount: <span className="success-font">{modalData?.remainingAmmount}$</span></h3>
                  <h3 className="message-color">{modalData?.message}</h3>
                </>
              ) : (
                <>
                  <h2>Your budget: <span className="blue-font">{modalData?.budgetAmmount} $</span></h2>
                  <h3>Current budget ammount:  <span className="danger-font">{modalData?.remainingAmmount} $</span></h3>
                  <h3 className="message-color">{modalData?.message}</h3>
                </>
              )
            }
          </div>
        </Modal>
      }

      <FormProvider {...methods}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormInputField
            name="budget"
            label="Your Budget"
            type="number"
            placeholder="Budget"
            validate={(item: any) => item !== "" || "This field can't be empty! "}
          />
          <div className="flex-right">
            <Button
              type="submit"
              className="form--btn"
            >
              Calculate
          </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}