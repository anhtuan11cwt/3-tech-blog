type Props = {
  children: React.ReactNode;
};

export default function ContainerLayout({ children }: Props) {
  return (
    <section
      className="
        w-[90%]
        xl:w-[75%]
        mx-auto
        pt-28
        pb-16
      "
    >
      {children}
    </section>
  );
}
