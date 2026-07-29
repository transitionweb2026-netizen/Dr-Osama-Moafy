export interface FormStatus {
  type: "success" | "error";
  text: string;
}

export function FormMessage({ status }: { status?: FormStatus | null }) {
  if (!status) return null;

  return (
    <p
      role={status.type === "error" ? "alert" : "status"}
      className={`rounded-lg px-3 py-2 text-sm ${
        status.type === "error"
          ? "bg-admin-danger-container text-admin-danger"
          : "bg-admin-success/10 text-admin-success"
      }`}
    >
      {status.text}
    </p>
  );
}
