import gql from "graphql-tag";

export const crearEscritura = gql`
  mutation crearEscritura($args: AWSJSON) {
    crearEscritura(args: $args)
  }
`;
