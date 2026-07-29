import { TreatmentForm } from "../TreatmentForm";
import { createTreatment } from "../actions";

export const metadata = { title: "New treatment" };

export default function NewTreatmentPage() {
  return <TreatmentForm action={createTreatment} />;
}
