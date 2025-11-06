// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters
const edad: number = 2;

let nombre: string;
nombre: 'Diego';

let esEmpleado: boolean;
esEmpleado = false;

const roles: Array<string> = ['developer', 'tester', 'designer'];

type User = {
  id: number;
  name: string;
  active?: boolean;
  handler?: () => string;
};

const user: User = {
  id: 23,
  name: 'Wilson',
};

let cursado: string | boolean;
cursado = 'SI';
cursado = false;

// Functions
const sumar = (a: number, b: number): number => {
  return (a + b);
};

// Generics
const operar = <T>(valor: T): T => {
  return valor;
};
console.log(operar<string>('Hola'));
