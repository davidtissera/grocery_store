export interface IExample {
  name: string;
}

export default function Example(props: IExample) {
  const { name } = props;

  return (
    <>
      {name}
    </>
  );
}
