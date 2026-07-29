import { ServiceForm } from "../ServiceForm";
import { createService } from "../actions";

export const metadata = { title: "New service" };

export default function NewServicePage() {
  return <ServiceForm action={createService} />;
}
