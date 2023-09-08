import { cn } from "@acme/tailwind-config/lib/utils";

type MainProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const Main = (props: MainProps) => {
  return (
    <main
      {...props}
      className={cn("container mx-auto my-10", props.className)}
    />
  );
};
