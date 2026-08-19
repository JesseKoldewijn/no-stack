import { useRouter } from './context';

export type LinkProps = {
  to: string;
  class?: string;
  children: unknown;
};

export function Link({ to, class: className, children }: LinkProps) {
  const router = useRouter();

  return (
    <a
      href={to}
      class={className}
      onClick={(event) => {
        event.preventDefault();
        void router.navigate({ to });
      }}
    >
      {children}
    </a>
  );
}
