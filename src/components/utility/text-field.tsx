import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

export default function TextField({
  name,
  label,
  control,
}: {
  name: "username" | "email" | "password";
  label: string;
  control?:
    | Control<{
        username: string;
        email: string;
        password: string;
      }>
    | undefined;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Input {...field} name={name} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
