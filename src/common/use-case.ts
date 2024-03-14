export interface Executable<Input, Output> {
  execute(input: Input): Output;
}
