import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import GetPurchaseOptions from "./purchaseOptions";

/* 
! THIS IS A JAVASCRIPT FILE
! I LITERALLY CANNOT WORK WITH 
!TYPESCRIPT RIGHT NOW
! 🤬🤬🤬 
*/
function PurchaseForm() {
  const purchaseOptions = GetPurchaseOptions();
  const maxPurchaseOptions = purchaseOptions.purchaseOptions.length;
  const formik = useFormik({
    initalValues: {
      type: "",
      item: "",
      issues: "",
    },
    validationSchema: Yup.object({
      type: Yup.required("Required").mixed().oneOf(["print", "web", "both"]),
      item: Yup.required("Required").number().min(0).max(maxPurchaseOptions),
      issues: Yup.required("Required").number().max(16).min(1),
    }),
    onSubmit: (values) => {
      alert("Submitted");
    },
  });
  return(
    <Formik 
    initalValues={{
        type: "",
        item: "",
        issues: "",
      }}
    validate={values => {
        
    }}

  );
}
export default PurchaseForm();
